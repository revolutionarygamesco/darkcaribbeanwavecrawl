import { MODULE_ID } from '../settings.ts'

import getCrawlState from '../state/get.ts'
import getPanelDimensions from '../utilities/get-dimensions.ts'
import getShip from '../state/ship/get.ts'
import setShip from '../state/ship/set.ts'
import removeShip from '../state/ship/remove.ts'
import glossAllPositions from './helpers/gloss-all.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'
import registerPartials from './register-partials.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
const dropSelector = '.droppable'
const INITIAL_TAB_UNSET = 'unset'

export class CrewPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null
  private _initialTab?: string = INITIAL_TAB_UNSET

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
      initial: 'ship'
    }
  }

  constructor(options = {}) {
    super(options)
    this.dragDrop = this.#createDragDropHandlers()
  }

  #createDragDropHandlers () {
    return this.options.dragDrop.map((d: DragDrop) => {
      d.permissions = {
        dragstart: this._canDragStart.bind(this),
        drop: this._canDragDrop.bind(this)
      }
      d.callbacks = {
        dragstart: this._onDragStart.bind(this),
        dragover: this._onDragOver.bind(this),
        drop: this._onDrop.bind(this),
      }

      return new foundry.applications.ux.DragDrop(d)
    })
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
    const ship = await getShip()
    if (!ship) return context

    context.ship = {
      image: ship.img,
      name: ship.name
    }

    return context
  }

  async _preparePositionsTab (context: any) {
    context.positions = await glossAllPositions()
    return context
  }

  async _prepareTeam (side: 'starboard' | 'larboard') {
    const state = await getCrawlState()
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
    await super._onRender(context, options)

    if (!this.dragDrop) return
    this.dragDrop.forEach((d) => d.bind(this.element))

    if (this._initialTab === INITIAL_TAB_UNSET) {
      const ship = await getShip()
      this._initialTab = ship ? 'positions' : 'ship'
    }

    const tabs = new foundry.applications.ux.Tabs({
      navSelector: '.tabs',
      contentSelector: 'section',
      initial: this._initialTab,
      group: 'crew-tabs'
    });
    tabs.bind(this.element)
    this._initialTab = undefined

    if (!this._buttonHandler) {
      this._buttonHandler = this._handleButtonClick.bind(this)
      this.element.addEventListener('click', this._buttonHandler)
    }
  }

  _canDragDrop() { return true }
  _canDragStart() { return true }
  _onDragOver() {}

  _onDragStart(event: DragEvent) {
    const id = (event.target as HTMLElement).dataset.entryId
    if (!id || !event.dataTransfer) return
    if ('setData' in event.dataTransfer) event.dataTransfer.setData('text/plain', id)
  }

  async _onShipDrop (event: DragEvent) {
    const data = foundry.applications.ux.TextEditor.getDragEventData(event)
    if (data.type !== 'Actor') return

    const id = data.uuid.split('.').pop()
    const actor = game.actors.get(id)
    if (!actor || actor.type !== 'vehicle') return

    await setShip(actor)
    await this.render()
  }

  async _onDrop (event: DragEvent): Promise<void> {
    const target = event.target as HTMLElement
    const el = target.closest(dropSelector) as HTMLElement
    if (!el) return

    if (el.classList.contains('ship')) return this._onShipDrop(event)
  }

  async _handleButtonClick (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button') as HTMLElement
    if (!button) return

    if (button.dataset.action === 'remove-ship') return await this._removeShip()
  }

  async _removeShip () {
    await removeShip()
    await this.render()
  }
}

const displayCrewPanel = async (): Promise<void> => {
  await registerPartials()
  const panel = new CrewPanel()
  await panel.render(true)
}

export default displayCrewPanel
