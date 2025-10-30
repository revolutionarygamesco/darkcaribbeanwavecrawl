import { MODULE_ID } from '../settings.ts'

import enrichActor from '../utilities/enrich-actor.ts'
import getWatch from '../time/get-watch.ts'
import getBells from '../time/get-bells.ts'
import getEarliestCrawlState from '../state/get-earliest-crawl-state.ts'
import getLunarPhase, { lunarIcons } from '../time/get-phase.ts'
import getDayNight from '../time/get-day-night.ts'
import getCrawlState from '../state/get.ts'
import describeNauticalTime from '../time/nautical-time.ts'
import openSetTimeDialog from './dialogs/set-time.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class DatePanel extends HandlebarsApplicationMixin(ApplicationV2) {
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

  async _prepareCrew (): Promise<Record<string, string>> {
    const state = await getCrawlState()
    const side = state.crew.teams.starboard.onDuty ? 'starboard' : 'larboard'
    const name = localize([MODULE_ID, 'date-panel', 'crew', side].join('.'))
    const team = state.crew.teams[side]

    const actors: Record<string, Actor | undefined> = {
      officer: game.actors.get(state.crew.positions[team.officer][0]),
      helm: team.helm ? game.actors.get(team.helm) : undefined,
      lookout: team.lookout ? game.actors.get(team.lookout) : undefined
    }

    return {
      name,
      officer: actors.officer ? await enrichActor(actors.officer) : '&mdash;',
      helm: actors.helm ? await enrichActor(actors.helm) : '&mdash;',
      lookout: actors.lookout ? await enrichActor(actors.lookout) : '&mdash;'
    }
  }

  async _adjustTime (event: Event) {
    const target = event.target as HTMLElement
    const set = target.closest('button[data-action="set-time"]') as HTMLElement
    if (set) return await openSetTimeDialog(async () => { await this.render({ force: true }) })

    const button = target.closest('button[data-action="adjust-time"]') as HTMLElement
    if (!button) return

    const request = parseInt(button.dataset.minutes ?? '0') * 60 * 1000
    await game.time.advance(request)
    await this.render()
  }

  async _prepareContext () {
    const date = new Date(game.time.worldTime)
    const hour = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const watch = getWatch(hour, minutes)
    const bells = getBells(hour, minutes)

    const day = date.toLocaleDateString(undefined, { weekday: 'long', timeZone: 'UTC' })
    const time = `${day} (${getDayNight(date)})`
    const exact = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
    const lunar = await this._prepareLunarPhase(date)

    const crew = await this._prepareCrew()
    const earliest = await getEarliestCrawlState()
    const limit = earliest?.timestamp
    const disableBackStep = limit ? (date.getTime() - (10 * 60 * 1000)) < limit : true
    const disableBackFast = limit ? (date.getTime() - (60 * 60 * 1000)) < limit : true

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
      isGM: game.user.isGM,
      crew,
      disableBackStep,
      disableBackFast
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

const displayDatePanel = async (): Promise<DatePanel> => {
  await registerPartials()
  const panel = new DatePanel()
  await panel.render(true)
  return panel
}

export default displayDatePanel
