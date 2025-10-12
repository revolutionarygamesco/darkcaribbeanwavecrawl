import { MODULE_ID } from '../settings.ts'

import getDate from '../time/get-date.ts'
import getWatch from '../time/get-watch.ts'
import getBells from '../time/get-bells.ts'
import getLunarPhase, { lunarIcons } from '../time/get-phase.ts'
import getDayNight from '../time/get-day-night.ts'
import describeNauticalTime from '../time/nautical-time.ts'
import getCaribbeanHour from '../time/get-caribbean-hour.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export default class DatePanel extends HandlebarsApplicationMixin(ApplicationV2) {
  private lunarSVGIcons: Map<string, string> = new Map()
  private _adjustHandler: ((event: Event) => Promise<void>) | null = null
  private updateHookId: number | null = null

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-date`,
    tag: 'aside',
    classes: ['date-panel'],
    position: {
      left: 16,
      top: Math.floor(window.innerHeight / 2)
    },
    window: {
      frame: false,
      resizable: false
    }
  }

  static PARTS = {
    date: {
      template: `./modules/${MODULE_ID}/templates/date.hbs`
    }
  }

  async _fetchSVG (url: string, alt: string): Promise<string> {
    if (this.lunarSVGIcons.has(url)) return this.lunarSVGIcons.get(url)!

    const res = await fetch(url)
    const text = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    if (!svg) return ''

    svg.classList.add('lunar')
    svg.setAttribute('aria-label', alt)
    this.lunarSVGIcons.set(url, svg.outerHTML)
    return svg.outerHTML
  }

  async _prepareLunarPhase (date: Date): Promise<string> {
    const phase = getLunarPhase(date)
    const icon = lunarIcons[phase] ?? 'new'
    const url = `modules/${MODULE_ID}/artwork/icons/lunar/${icon}.svg`
    return await this._fetchSVG(url, phase)
  }

  async _adjustTime (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button[data-action="adjust-time"]') as HTMLElement
    if (!button) return

    const request = parseInt(button.dataset.minutes ?? '0') * 60
    await game.time.advance(request)
    await this.render()
  }

  async _prepareContext () {
    const date = getDate()
    const hour = getCaribbeanHour(date)
    const minutes = date.getUTCMinutes()
    const watch = getWatch(hour, minutes)
    const bells = getBells(hour, minutes)

    const day = date.toLocaleDateString(undefined, { weekday: 'long', timeZone: 'Etc/GMT+5' })
    const time = `${day} (${getDayNight(date)})`
    const exact = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'Etc/GMT+5' })
    const lunar = await this._prepareLunarPhase(date)

    return {
      date: date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      exact,
      time,
      lunar,
      watch: describeNauticalTime(watch, bells),
      isGM: game.user.isGM
    }
  }

  async _onRender(context: any, options: any): Promise<void> {
    await super._onRender(context, options)

    if (!this._adjustHandler) {
      this._adjustHandler = this._adjustTime.bind(this)
      this.element.addEventListener('click', this._adjustHandler)
    }

    if (this.updateHookId) return
    this.updateHookId = Hooks.on('updateWorldTime', () => { this.render() })
  }

  async close (options?: any): Promise<this> {
    if (!this.updateHookId) return super.close(options)
    Hooks.off('updateSetting', this.updateHookId)
    this.updateHookId = null
    return super.close(options)
  }
}
