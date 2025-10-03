const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import getDate from './get.ts'
import getTime from './time.ts'
import adjustTime from './adjust.ts'
import calculateLunarPhase, { lunarIcons } from './phase.ts'
import calculateDayNight from './day-night.ts'

export default class DatePanel extends HandlebarsApplicationMixin(ApplicationV2) {
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
      resizable: false,
      height: 'auto',
      width: 'auto'
    }
  }

  static PARTS = {
    date: {
      template: `./modules/${MODULE_ID}/templates/date.hbs`
    }
  }

  async _fetchSVG (url: string, alt: string): Promise<string> {
    const res = await fetch(url)
    const text = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    if (!svg) return ''

    svg.classList.add('lunar')
    svg.setAttribute('aria-label', alt)
    return svg.outerHTML
  }

  async _prepareLunarPhase (date: Date): Promise<string> {
    const phase = calculateLunarPhase(date)
    const icon = lunarIcons[phase] ?? 'new'
    const url = `modules/${MODULE_ID}/artwork/icons/lunar/${icon}.svg`
    return await this._fetchSVG(url, phase)
  }

  async _prepareContext () {
    const date = getDate()
    const day = date.toLocaleDateString(undefined, { weekday: 'long' })
    const time = `${day} (${calculateDayNight(date)})`
    const watch = getTime(date)
    const exact = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit'})
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
      watch: watch.text,
      isGM: game.user.isGM
    }
  }

  async _onRender(context: any, options: any): Promise<void> {
    await super._onRender(context, options)

    const buttons = this.element.querySelectorAll('button[data-action="adjust-time"]')
    for (const button of buttons) {
      button.addEventListener('click', async (event: Event) => {
        const target = event.target as HTMLElement
        const requested = parseInt(target.dataset.minutes ?? '0')
        await adjustTime(requested)
        await this.render()
      })
    }

    Hooks.on('updateSetting', (setting: any) => {
      if (setting.key === `${MODULE_ID}.${MODULE_SETTINGS.MINUTES}`) this.render()
    })
  }
}
