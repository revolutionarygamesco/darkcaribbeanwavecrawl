const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'
import getDate from './get.ts'
import getTime from './time.ts'
import calculateDayNight from './day-night.ts'

export default class DatePanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-date`,
    tag: 'aside',
    classes: ['date-panel'],
    position: {
      left: 50,
      top: window.innerHeight - 400
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

  _prepareContext () {
    const date = getDate()
    const day = date.toLocaleDateString(undefined, { weekday: 'long' })
    const time = `${day} (${calculateDayNight(date)})`
    const watch = getTime(date)
    const exact = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit'})

    return {
      date: date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      exact,
      time,
      watch: watch.text,
      isGM: game.user.isGM
    }
  }

  async _onRender(context: any, options: any): Promise<void> {
    await super._onRender(context, options)

    Hooks.on('updateSetting', (setting: any) => {
      if (setting.key === `${MODULE_ID}.${MODULE_SETTINGS.MINUTES}`) this.render()
    })
  }
}
