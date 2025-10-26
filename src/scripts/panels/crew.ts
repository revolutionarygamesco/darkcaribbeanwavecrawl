import { MODULE_ID } from '../settings.ts'
import {ActorListing, CrawlTeamSide} from '../state/state.ts'

import addToTeam from '../state/crew/teams/members/add.ts'
import enrichActor from '../utilities/enrich-actor.ts'
import getCrawlState from '../state/get.ts'
import getPanelDimensions from '../utilities/get-dimensions.ts'
import getShip from '../state/ship/get.ts'
import setShip from '../state/ship/set.ts'
import setHelm from '../state/crew/teams/helm/set.ts'
import setLookout from '../state/crew/teams/lookout/set.ts'
import setOfficer from '../state/crew/teams/officer/set.ts'
import removeShip from '../state/ship/remove.ts'
import removeHelm from '../state/crew/teams/helm/remove.ts'
import removeLookout from '../state/crew/teams/lookout/remove.ts'
import removeFromTeam from '../state/crew/teams/members/remove.ts'
import assign from '../state/crew/positions/assign.ts'
import unassign from '../state/crew/positions/unassign.ts'
import glossAllPositions from './helpers/gloss-all.ts'
import mapIdsToActors from '../utilities/map-ids-to-actors.ts'
import registerPartials from './register-partials.ts'
import actorToListing from '../utilities/actor-to-listing.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
const dropSelector = '.droppable'
const CURRENT_TAB_UNSET = 'unset'

export class CrewPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null
  private _inputChangeHandler: ((event: Event) => Promise<void>) | null = null
  private _currentTab: string = CURRENT_TAB_UNSET

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-crew`,
    tag: 'section',
    classes: ['crew-panel'],
    window: {
      resizable: true,
      title: 'The Company'
    },
    position: getPanelDimensions(1000, 2/3),
    dragDrop: [{ dropSelector }]
  }

  static PARTS = {
    tabs: {
      template: `./modules/${MODULE_ID}/templates/crew-tabs.hbs`
    },
    ship: {
      template: `./modules/${MODULE_ID}/templates/ship.hbs`,
      scrollable: ['.crew-ship']
    },
    positions: {
      template: `./modules/${MODULE_ID}/templates/positions.hbs`,
      scrollable: ['.crew-positions']
    },
    teams: {
      template: `./modules/${MODULE_ID}/templates/teams.hbs`,
      scrollable: ['.crew-teams']
    }
  }

  static TABS = {
    primary: {
      tabs: [{ id: 'ship' }, { id: 'positions' }, { id: 'teams' }],
      initial: 'ship'
    }
  }

  constructor (options = {}) {
    super(options)
    this.dragDrop = this.#createDragDropHandlers()
  }

  static isCrawlTeamSide (str: unknown): str is CrawlTeamSide {
    return str === 'starboard' || str === 'larboard'
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

  async _prepareContext () {
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
      name: await enrichActor(ship)
    }

    return context
  }

  async _preparePositionsTab (context: any) {
    context.positions = await glossAllPositions()
    return context
  }

  async _prepareTeam (side: CrawlTeamSide) {
    const state = await getCrawlState()
    const team = state.crew.teams[side]

    const officerIDs = state.crew.positions[team.officer]
    const officerActors = mapIdsToActors(officerIDs)
    const officers: ActorListing[] = []
    for (const actor of officerActors) officers.push(await actorToListing(actor))

    const helm = team.helm ? game.actors.get(team.helm) : undefined
    const lookout = team.lookout ? game.actors.get(team.lookout) : undefined

    const named: string[] = [...officerIDs, team.helm, team.lookout]
      .filter((id: string | undefined): id is string => id !== undefined)
    const namedActors = mapIdsToActors(team.members.filter(id => !named.includes(id)))
    const others: ActorListing[] = []
    for (const actor of namedActors) others.push(await actorToListing(actor))

    return {
      side,
      name: `${MODULE_ID}.crew-panel.teams.sides.${side}`,
      isQuartermaster: team.officer === 'quartermaster',
      officerName: team.officer === 'quartermaster' ? 'quartermaster' : 'sailing master',
      officers,
      helm: helm ? await actorToListing(helm) : undefined,
      lookout: lookout ? await actorToListing(lookout) : undefined,
      others
    }
  }

  async _prepareTeamsTab (context: any) {
    context.teams = {
      starboard: await this._prepareTeam('starboard'),
      larboard: await this._prepareTeam('larboard')
    }

    return context
  }

  async _onRender (context: any, options: any) {
    await super._onRender(context, options)

    if (!this.dragDrop) return
    this.dragDrop.forEach((d) => d.bind(this.element))

    if (this._currentTab === CURRENT_TAB_UNSET) {
      const ship = await getShip()
      this._currentTab = ship ? 'positions' : 'ship'
    }

    const tabs = new foundry.applications.ux.Tabs({
      navSelector: '.tabs',
      contentSelector: 'section',
      initial: this._currentTab,
      group: 'crew-tabs'
    })

    tabs._onClickNav = (event: PointerEvent) => {
      const btn = event?.target as HTMLElement | undefined
      if (!btn) return
      this._currentTab = btn.closest('button')?.dataset.tab ?? this._currentTab
      tabs.activate(this._currentTab)
    }

    tabs.bind(this.element)

    if (!this._buttonHandler) {
      this._buttonHandler = this._handleButtonClick.bind(this)
      this.element.addEventListener('click', this._buttonHandler)
    }

    if (!this._inputChangeHandler) {
      this._inputChangeHandler = this._handleInputChange.bind(this)
      this.element.addEventListener('change', this._inputChangeHandler)
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

  _droppedActor (event: DragEvent, type: string = 'character'): Actor | null {
    const data = foundry.applications.ux.TextEditor.getDragEventData(event)
    if (data.type !== 'Actor') return null

    const id = data.uuid.split('.').pop()
    const actor = game.actors.get(id)
    return actor && actor.type === type ? actor : null
  }

  async _onShipDrop (event: DragEvent) {
    const actor = this._droppedActor(event, 'vehicle')
    if (!actor) return
    await setShip(actor)
    await this.render()
  }

  async _onPositionDrop (event: DragEvent, el: HTMLElement) {
    const actor = this._droppedActor(event)
    if (!actor) return

    const position = el.dataset.positionId
    if (!position) return

    await assign(position, actor.id)
    await this.render()
  }

  async _onTeamPositionDrop (event: DragEvent, el: HTMLElement) {
    const actor = this._droppedActor(event)
    if (!actor) return

    const team = el.dataset.team
    if (!CrewPanel.isCrawlTeamSide(team)) return

    const position = el.dataset.position
    if (position !== 'helm' && position !== 'lookout') return

    const fn = position === 'helm' ? setHelm : setLookout
    await fn(team, actor)
    await this.render()
  }

  async _onTeamListDrop (event: DragEvent, el: HTMLElement) {
    const actor = this._droppedActor(event)
    if (!actor) return

    const team = el.dataset.team
    if (!CrewPanel.isCrawlTeamSide(team)) return

    await addToTeam(team, actor)
    await this.render()
  }

  async _onDrop (event: DragEvent): Promise<void> {
    const target = event.target as HTMLElement
    const el = target.closest(dropSelector) as HTMLElement
    if (!el) return

    if (el.classList.contains('ship')) return this._onShipDrop(event)
    if (el.classList.contains('position')) return this._onPositionDrop(event, el)
    if (el.classList.contains('team-position')) return this._onTeamPositionDrop(event, el)
    if (el.classList.contains('additional-crew')) return this._onTeamListDrop(event, el)
  }

  async _handleButtonClick (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button') as HTMLElement
    if (!button) return

    switch (button.dataset.action) {
      case 'remove-ship': return await this._removeShip()
      case 'unassign-position': return await this._unassignPosition(button)
      case 'unassign-helm': return await this._unassignHelm(button)
      case 'unassign-lookout': return await this._unassignLookout(button)
      case 'unassign-team': return await this._unassignTeam(button)
    }
  }

  async _handleInputChange (event: Event) {
    const target = event.target as HTMLElement
    const input = target.closest('input, select') as HTMLElement
    if (!input) return

    if (input.classList.contains('team-officer')) return this._switchOfficer(input)
  }

  async _removeShip () {
    await removeShip()
    await this.render()
  }

  async _unassignPosition (button: HTMLElement) {
    const position = button.dataset.positionId
    const actor = button.dataset.actorId
    if (!position || !actor) return
    await unassign(position, actor)
    await this.render()
  }

  async _unassignHelm (button: HTMLElement) {
    const side = button.dataset.positionId
    if (!CrewPanel.isCrawlTeamSide(side)) return
    await removeHelm(side)
    await this.render()
  }

  async _unassignLookout (button: HTMLElement) {
    const side = button.dataset.positionId
    if (!CrewPanel.isCrawlTeamSide(side)) return
    await removeLookout(side)
    await this.render()
  }

  async _unassignTeam (button: HTMLElement) {
    const side = button.dataset.positionId
    const actor = button.dataset.actorId
    if (!CrewPanel.isCrawlTeamSide(side) || !actor) return
    await removeFromTeam(side, actor)
    await this.render()
  }

  async _switchOfficer (input: HTMLElement) {
    const team = input.dataset.team
    if (!CrewPanel.isCrawlTeamSide(team)) return

    const officer = (input as HTMLSelectElement).value
    if (officer !== 'quartermaster' && officer !== 'master') return

    await setOfficer(team, officer)
    await this.render()
  }

  _onClose () {
    this._currentTab = CURRENT_TAB_UNSET
  }
}

const displayCrewPanel = async (): Promise<CrewPanel> => {
  await registerPartials()
  const panel = new CrewPanel()
  await panel.render(true)
  return panel
}

export default displayCrewPanel
