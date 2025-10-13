import { MODULE_ID } from '../settings.ts'

import getCrawlState from '../state/get.ts'
import getPanelDimensions from '../utilities/get-dimensions.ts'
import getShip from '../state/ship/get.ts'
import glossAllPositions from './helpers/gloss-all.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'
import registerPartials from './register-partials.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
const dropSelector = '.droppable'
const ship = getShip()

export class CrewPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-crew`,
    tag: 'section',
    classes: ['crew-panel'],
    window: {
      resizable: true,
      title: 'The Company'
    },
    position: getPanelDimensions(1/2, 2/3),
    dragDrop: [{ dropSelector }]
  }

  static PARTS = {
    tabs: {
      template: `./modules/${MODULE_ID}/templates/crew-tabs.hbs`
    },
    ship: {
      template: `./modules/${MODULE_ID}/templates/ship.hbs`,
      scrollable: ['']
    },
    positions: {
      template: `./modules/${MODULE_ID}/templates/positions.hbs`,
      scrollable: ['']
    },
    teams: {
      template: `./modules/${MODULE_ID}/templates/teams.hbs`,
      scrollable: ['']
    }
  }

  static TABS = {
    primary: {
      tabs: [{ id: 'ship' }, { id: 'positions' }, { id: 'teams' }],
      initial: CrewPanel._getInitialTab()
    }
  }

  static _getInitialTab () {
    return ship ? 'positions' : 'ship'
  }

  async _prepareContext() {
    return {
      tabs: this._prepareTabs('primary')
    }
  }

  async _preparePartContext (part: string, context: any) {
    context.tab = context.tabs[part]

    switch (part) {
      case 'ship': return await this._prepareShipTab(context)
      case 'positions': return await this._preparePositionsTab(context)
      case 'teams': return await this._prepareTeamsTab(context)
      default: return context
    }
  }

  async _prepareShipTab (context: any) {
    if (!ship) return context

    context.ship = {
      image: ship.img,
      name: ship.name
    }

    return context
  }

  async _preparePositionsTab (context: any) {
    context.positions = glossAllPositions()
    return context
  }

  async _prepareTeam (side: 'starboard' | 'larboard') {
    const state = getCrawlState()
    const team = state.crew.teams[side]
    const officerIDs = state.crew.positions[team.officer].assigned
    const named: string[] = [...officerIDs, team.helm, team.lookout]
      .filter((id: string | undefined): id is string => id !== undefined)

    return {
      side,
      name: side === 'starboard' ? 'Starboard Crew' : 'Larboard Crew',
      isQuartermaster: team.officer === 'quartermaster',
      officers: mapIdsToActors(officerIDs),
      helm: team.helm ? game.actors.get(team.helm) : undefined,
      lookout: team.lookout ? game.actors.get(team.lookout) : undefined,
      others: mapIdsToActors(team.members.filter(id => !named.includes(id)))
    }
  }

  async _prepareTeamsTab (context: any) {
    context.teams = {
      starboard: this._prepareTeam('starboard'),
      larboard: this._prepareTeam('larboard')
    }

    return context
  }

  async _onRender(context: any, options: any) {
    await super._onRender(context, options);

    const tabs = new foundry.applications.ux.Tabs({
      navSelector: '.tabs',
      contentSelector: 'section',
      initial: CrewPanel._getInitialTab(),
      group: 'crew-tabs'
    });
    tabs.bind(this.element)
  }
}

const displayCrewPanel = async (): Promise<void> => {
  await registerPartials()
  const panel = new CrewPanel()
  await panel.render(true)
}

export default displayCrewPanel
