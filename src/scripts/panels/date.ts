import { MODULE_ID } from '../settings.ts'

import enrichActor from '../utilities/enrich-actor.ts'
import getDate from '../time/get-date.ts'
import getWatch from '../time/get-watch.ts'
import getBells from '../time/get-bells.ts'
import getLunarPhase, { lunarIcons } from '../time/get-phase.ts'
import getDayNight from '../time/get-day-night.ts'
import getCrawlState from '../state/get.ts'
import describeNauticalTime from '../time/nautical-time.ts'
import setTime, { SetTimeOptions } from '../time/set.ts'
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

  parseSetTimeSelect (coll: HTMLFormControlsCollection, field: string, fallback: number): number {
    const select = coll[field as any] as HTMLSelectElement
    const parsed = parseInt(select.value)
    return isNaN(parsed) ? fallback : parsed
  }

  async openSetTimeDialog () {
    const curr = getDate()
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const years: string[] = []
    for (let year = 1600; year < 1800; year++) {
      const option = curr.getUTCFullYear() === year
        ? `<option selected>${year}</option>`
        : `<option>${year}</option>`
      years.push(option)
    }

    const months: string[] = []
    for (let month = 0; month < 12; month++) {
      const option = curr.getUTCMonth() === month
        ? `<option value="${month}" selected>${monthNames[month]}</option>`
        : `<option value="${month}">${monthNames[month]}</option>`
      months.push(option)
    }

    const days: string[] = []
    for (let day = 1; day < 32; day++) {
      const option = curr.getUTCDate() === day
        ? `<option selected>${day}</option>`
        : `<option>${day}</option>`
      days.push(option)
    }

    const hours: string[] = []
    for (let hour = 0; hour < 24; hour++) {
      const option = curr.getUTCHours() === hour
        ? `<option selected>${hour}</option>`
        : `<option>${hour}</option>`
      hours.push(option)
    }

    const minutes: string[] = []
    for (let minute = 0; minute < 60; minute++) {
      const option = curr.getUTCMinutes() === minute
        ? `<option selected>${minute}</option>`
        : `<option>${minute}</option>`
      minutes.push(option)
    }

    const dialog = new foundry.applications.api.DialogV2({
      id: `${MODULE_ID}-set-time`,
      window: { title: 'Set the date' },
      content: `
      <label for="set-time-year">Year</label><select id="set-time-year" name="year">${years.join('')}</select>
      <label for="set-time-month">Month</label><select id="set-time-month" name="month">${months.join('')}</select>
      <label for="set-time-date">Day</label><select id="set-time-date" name="date">${days.join('')}</select>
      <label for="set-time-hour">Hour</label><select id="set-time-hour" name="hour">${hours.join('')}</select>
      <label for="set-time-minute">Minute</label><select id="set-time-minute" name="minute">${minutes.join('')}</select>
      `,
      buttons: [
        {
          action: 'set',
          label: 'Set Time',
          default: true,
          callback: async (_event: Event, button: HTMLButtonElement) => {
            const coll = button.form?.elements
            if (!coll) return

            const options: SetTimeOptions = {
              year: this.parseSetTimeSelect(coll, 'year', curr.getUTCFullYear()),
              month: this.parseSetTimeSelect(coll, 'month', curr.getUTCMonth()),
              date: this.parseSetTimeSelect(coll, 'date', curr.getUTCDate()),
              hour: this.parseSetTimeSelect(coll, 'hour', curr.getUTCHours()),
              minute: this.parseSetTimeSelect(coll, 'minute', curr.getUTCMinutes())
            }

            await setTime(options, curr)
          }
        }
      ]
    })

    await dialog.render(true)
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
    if (set) return await this.openSetTimeDialog()

    const button = target.closest('button[data-action="adjust-time"]') as HTMLElement
    if (!button) return

    const request = parseInt(button.dataset.minutes ?? '0') * 60
    await game.time.advance(request)
    await this.render()
  }

  async _prepareContext () {
    const date = getDate()
    const hour = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const watch = getWatch(hour, minutes)
    const bells = getBells(hour, minutes)

    const day = date.toLocaleDateString(undefined, { weekday: 'long', timeZone: 'UTC' })
    const time = `${day} (${getDayNight(date)})`
    const exact = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' })
    const lunar = await this._prepareLunarPhase(date)

    const crew = await this._prepareCrew()

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
      crew
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
