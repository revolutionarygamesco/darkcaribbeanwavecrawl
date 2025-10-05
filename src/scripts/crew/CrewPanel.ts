import { MODULE_ID } from '../settings.ts'
import getPositions from './positions.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

const getHeight = (): number => Math.floor(window.innerHeight * (2/3))
const getWidth = (): number => Math.floor(window.innerWidth * (1/3))
const getTop = (): number => Math.ceil((window.innerHeight - getHeight()) / 2)
const getLeft = (): number => Math.ceil((window.innerWidth - getWidth()) / 2)

export default class CrewPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-crew`,
    tag: 'section',
    classes: ['crew-panel'],
    window: {
      resizable: true,
      title: 'Crew Roster'
    },
    position: {
      height: getHeight(),
      width: getWidth(),
      top: getTop(),
      left: getLeft()
    }
  }

  static PARTS = {
    crew: {
      template: `./modules/${MODULE_ID}/templates/crew.hbs`,
      scrollable: ['.crew-positions-page']
    }
  }

  async _prepareContext () {
    return {
      positions: getPositions()
    }
  }
}
