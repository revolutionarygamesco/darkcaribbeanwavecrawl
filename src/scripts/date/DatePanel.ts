const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
import { MODULE_ID } from '../settings.ts'

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
}
