import { MODULE_ID } from '../settings.ts'

import { Ghost } from '../state/state.ts'
import GhostReport, { HauntLevel } from '../state/ghosts/report.ts'

import getPanelDimensions from '../utilities/get-dimensions.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'
import enrichActor from '../utilities/enrich-actor.ts'
import getGhosts from '../state/ghosts/get.ts'
import completeGhost from '../state/ghosts/complete.ts'
import addGhost from '../state/ghosts/haunting/add.ts'
import addPotentialGhost from '../state/ghosts/potential/add.ts'
import updateGhost from '../state/ghosts/haunting/update.ts'
import updatePotentialGhost from '../state/ghosts/potential/update.ts'
import realizePotentialGhost from '../state/ghosts/potential/realize.ts'
import removePotentialGhost from '../state/ghosts/potential/remove.ts'
import removeGhost from '../state/ghosts/haunting/remove.ts'

import ids from '../ids.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
const dropSelector = '.droppable'

export class GhostsPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static INITIAL_TAB = 'potential'
  static GHOST_LISTING_CLASS = 'ghost-listing'

  static _path = [MODULE_ID, 'ghosts-panel']
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null
  private _listingHandler: ((event: Event) => Promise<void>) | null = null
  private _revHandler: ((event: Event) => Promise<void>) | null = null
  private _currentTab: string = GhostsPanel.INITIAL_TAB
  private _currentPotential: string | null = null
  private _currentHaunting: string | null = null
  private _isEditing: boolean = false
  private _hauntLevel: HauntLevel = 'normal'

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-ghosts`,
    tag: 'section',
    classes: ['ghosts-panel'],
    window: {
      resizable: true,
      title: localize([...GhostsPanel._path, 'window', 'title'].join('.'))
    },
    position: getPanelDimensions(800, 2/3),
    dragDrop: [{ dropSelector }]
  }

  static PARTS = {
    tabs: {
      template: `./modules/${MODULE_ID}/templates/ghosts-tabs.hbs`
    },
    potential: {
      template: `./modules/${MODULE_ID}/templates/ghosts-potential.hbs`,
      scrollable: ['.tab']
    },
    haunting: {
      template: `./modules/${MODULE_ID}/templates/ghosts-haunting.hbs`,
      scrollable: ['.tab']
    }
  }

  static TABS = {
    primary: {
      tabs: [{ id: 'potential' }, { id: 'haunting' }],
      initial: GhostsPanel.INITIAL_TAB
    }
  }

  constructor (options = {}) {
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

  _getCurrentGhostId (): string | null {
    const isPotential = this._currentTab === 'potential'
    return isPotential ? this._currentPotential : this._currentHaunting
  }

  _addListingClasses (ghost: Ghost) {
    const classes = [GhostsPanel.GHOST_LISTING_CLASS]
    if (this._getCurrentGhostId() === ghost.id) classes.push('active')
    return {
      ...ghost,
      classes: classes.join(' ')
    }
  }

  _droppedActor (event: DragEvent): Actor | null {
    const data = foundry.applications.ux.TextEditor.getDragEventData(event)
    if (data.type !== 'Actor') return null

    const id = data.uuid.split('.').pop()
    const actor = game.actors.get(id)
    return actor ?? null
  }

  async _getCurrentGhost (report?: GhostReport): Promise<Ghost | null> {
    const { potential, haunting } = report ?? await getGhosts()

    const inPotential = this._currentPotential && potential.map(ghost => ghost.id).includes(this._currentPotential)
    if (!inPotential && potential.length > 0) this._currentPotential = potential[0].id

    const inHaunt = this._currentHaunting && haunting.map(ghost => ghost.id).includes(this._currentHaunting)
    if (!inHaunt && haunting.length > 0) this._currentHaunting = haunting[0].id

    const isPotential = this._currentTab === 'potential'
    const list = isPotential ? potential : haunting
    return list.find(ghost => ghost.id === this._getCurrentGhostId()) ?? null
  }

  async _prepareContext () {
    const { haunt, haunting, potential } = await getGhosts()
    await this._checkHaunt(haunt)

    const ghost = await this._getCurrentGhost()
    const a = game.actors && ghost && ghost.actor ? game.actors.get(ghost.actor) : undefined
    const actor = a ? await enrichActor(a) : undefined
    const notes = ghost && foundry.applications.ux.TextEditor
      ? await foundry.applications.ux.TextEditor.enrichHTML(ghost.notes)
      : ''

    let revelationOptions
    if (ghost) {
      const names: Record<string, string> = {
        named: ghost.names.human,
        seen: ghost.names.haunted,
        unseen: localize([...GhostsPanel._path, 'unseen'].join('.'))
      }

      const revelation = ghost.status.named ? 'named' : ghost.status.seen ? 'seen' : 'unseen';
      (ghost.names as any).revealed = names[revelation]

      const path = [...GhostsPanel._path, 'fields', 'revelation', 'options']
      revelationOptions = ['unseen', 'seen', 'named'].map(status => {
        return { status, text: localize([...path, status].join('.')), selected: revelation === status }
      })
    }

    return {
      tabs: this._prepareTabs('primary'),
      haunt,
      haunting,
      potential,
      ghost,
      actor,
      notes,
      revelationOptions,
      editing: this._isEditing
    }
  }

  async _preparePartContext (part: string, context: any) {
    context.tab = context.tabs[part]

    switch (part) {
      case 'potential': return await this._preparePotentialTab(context)
      case 'haunting': return await this._prepareHauntingTab(context)
      default: return context
    }
  }

  async _prepareGhostTab (context: any, list: Ghost[]) {
    const ghosts = list.map(ghost => this._addListingClasses(ghost))
    return {
      ...context,
      isEmpty: list.length < 1,
      ghosts
    }
  }

  async _preparePotentialTab (context: any) {
    return this._prepareGhostTab(context, context.potential as Ghost[])
  }

  async _prepareHauntingTab (context: any) {
    return this._prepareGhostTab(context, context.haunting as Ghost[])
  }

  async _onRender (context: any, options: any) {
    await super._onRender(context, options)

    if (!this.dragDrop) return
    this.dragDrop.forEach((d) => d.bind(this.element))

    const tabs = new foundry.applications.ux.Tabs({
      navSelector: '.tabs',
      contentSelector: 'section',
      initial: this._currentTab,
      group: 'ghosts-tabs'
    })

    tabs._onClickNav = async (event: PointerEvent) => {
      const btn = event?.target as HTMLElement | undefined
      if (!btn) return

      const newTab = btn.closest('button')?.dataset.tab
      if (newTab && newTab !== this._currentTab) {
        this._currentTab = newTab
        await this.render({ force: true })
      }
    }

    tabs.bind(this.element)

    if (!this._buttonHandler) {
      this._buttonHandler = this._handleButtonClick.bind(this)
      this.element.addEventListener('click', this._buttonHandler)
    }

    if (!this._listingHandler) {
      this._listingHandler = this._handleListingClick.bind(this)
      this.element.addEventListener('click', this._listingHandler)
    }

    if (!this._revHandler) {
      this._revHandler = this._handleRevelationChange.bind(this)
      this.element.addEventListener('change', this._revHandler)
    }
  }

  async _handleButtonClick (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button') as HTMLElement
    if (!button) return

    switch (button.dataset.action) {
      case 'add-haunting': return await this._addGhost()
      case 'add-potential': return await this._addGhost(false)
      case 'edit': return await this._activateEditing()
      case 'cancel-editing': return await this._deactivateEditing()
      case 'save': return await this._saveGhost()
      case 'haunt': return await this._sendGhost()
      case 'delete': return await this._deleteGhost()
    }
  }

  async _handleListingClick (event: Event) {
    const target = event.target as HTMLElement
    const listing = target.closest(`.${GhostsPanel.GHOST_LISTING_CLASS}`) as HTMLElement
    if (!listing) return

    const update = listing.dataset.setGhost as string
    if (this._currentTab === 'potential') {
      this._currentPotential = update
    } else {
      this._currentHaunting = update
    }

    await this.render({ force: true })
  }

  async _handleRevelationChange (event: Event) {
    const target = event.target as HTMLElement
    const input = target.closest('input[name="ghost-revelation"]') as HTMLInputElement
    if (!input) return

    const id = this._getCurrentGhostId()
    if (!id) return

    const val = input.value
    const seen = val !== 'unseen'
    const named = val === 'named'
    await updateGhost(id, { status: { seen, named }})
    await this.render({ force: true })
  }

  async _addGhost (haunting: boolean = true) {
    const fn = haunting ? addGhost : addPotentialGhost
    await fn(completeGhost())
    await this.render({ force: true })
  }

  async _activateEditing (){
    this._isEditing = true
    await this.render({ force: true })
  }

  async _deactivateEditing (){
    this._isEditing = false
    await this.render({ force: true })
  }

  async _saveGhost () {
    const ghost = await this._getCurrentGhost()
    if (!ghost) return this._deactivateEditing()

    const fields = {
      haunted: this.element.querySelector('input[name="ghost-haunted-name"]') as HTMLInputElement | null,
      human: this.element.querySelector('input[name="ghost-human-name"]') as HTMLInputElement | null,
      notes: this.element.querySelector('prose-mirror[name="notes"]') as any
    }

    const fn = this._currentTab === 'potential' ? updatePotentialGhost : updateGhost
    await fn(ghost.id, {
      names: {
        haunted: fields.haunted?.value,
        human: fields.human?.value
      },
      notes: fields.notes?.value
    })

    this._isEditing = false
    await this.render({ force: true })
  }

  async _sendGhost () {
    const ghost = await this._getCurrentGhost()
    if (!ghost) return

    await realizePotentialGhost(ghost)
    this._currentTab = 'haunting'
    this._currentPotential = null
    this._currentHaunting = ghost.id
    await this.render({ force: true })
  }

  async _deleteGhost () {
    const ghost = await this._getCurrentGhost()
    if (!ghost) return this._deactivateEditing()

    const fn = this._currentTab === 'potential' ? removePotentialGhost : removeGhost
    await fn(ghost)
    await this.render({ force: true })
  }

  _canDragDrop() { return true }
  _canDragStart() { return true }
  _onDragOver() {}

  _onDragStart(event: DragEvent) {
    const id = (event.target as HTMLElement).dataset.entryId
    if (!id || !event.dataTransfer) return
    if ('setData' in event.dataTransfer) event.dataTransfer.setData('text/plain', id)
  }

  async _onDrop (event: DragEvent): Promise<void> {
    const target = event.target as HTMLElement
    const el = target.closest(dropSelector) as HTMLElement
    if (!el) return

    if (el.classList.contains('actor')) return this._onActorDrop(event)
  }

  async _onActorDrop (event: DragEvent) {
    const ghost = await this._getCurrentGhost()
    if (!ghost) return

    const actor = this._droppedActor(event)
    if (!actor) return

    const fn = this._currentTab === 'potential' ? updatePotentialGhost : updateGhost
    await fn(ghost.id, { actor: actor.id })
    await this.render({ force: true })
  }

  async _checkHaunt (level: HauntLevel) {
    if (this._hauntLevel === level) return
    this._hauntLevel = level
    await this._showHaunt(level)
  }

  async _showHaunt (level: HauntLevel) {
    const { map, haunt } = ids
    const { normal, bloody, dark, light } = haunt

    const scene = game.scenes.get(map)
    if (!scene) return

    await scene.updateEmbeddedDocuments('Tile', [
      { _id: normal, alpha: level === 'normal' ? 1 : 0 },
      { _id: bloody, alpha: level === 'bloody' ? 1 : 0 },
      { _id: dark, alpha: level === 'dark' ? 1 : 0 }
    ])

    await scene.updateEmbeddedDocuments('AmbientLight', [
      { _id: light, hidden: level !== 'dark' }
    ])
  }
}

const displayGhostsPanel = async (): Promise<GhostsPanel> => {
  await registerPartials()
  const panel = new GhostsPanel()
  await panel.render(true)
  return panel
}

export default displayGhostsPanel
