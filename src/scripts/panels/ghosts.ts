import { MODULE_ID } from '../settings.ts'

import { Ghost } from '../state/state.ts'

import getPanelDimensions from '../utilities/get-dimensions.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'
import getGhosts from '../state/ghosts/get.ts'
import completeGhost from '../state/ghosts/complete.ts'
import addGhost from '../state/ghosts/haunting/add.ts'
import addPotentialGhost from '../state/ghosts/potential/add.ts'
import updateGhost from '../state/ghosts/haunting/update.ts'
import updatePotentialGhost from '../state/ghosts/potential/update.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class GhostsPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static INITIAL_TAB = 'potential'
  static GHOST_LISTING_CLASS = 'ghost-listing'

  static _path = [MODULE_ID, 'ghosts-panel']
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null
  private _listingHandler: ((event: Event) => Promise<void>) | null = null
  private _currentTab: string = GhostsPanel.INITIAL_TAB
  private _currentGhost: string | null = null
  private _isEditing: boolean = false

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-ghosts`,
    tag: 'section',
    classes: ['ghosts-panel'],
    window: {
      resizable: true,
      title: localize([...GhostsPanel._path, 'window', 'title'].join('.'))
    },
    position: getPanelDimensions(800, 2/3)
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

  _addListingClasses (ghost: Ghost) {
    const classes = [GhostsPanel.GHOST_LISTING_CLASS]
    if (this._currentGhost === ghost.id) classes.push('active')
    return {
      ...ghost,
      classes: classes.join(' ')
    }
  }

  async _prepareContext () {
    const { haunt, haunting, potential } = await getGhosts()

    return {
      tabs: this._prepareTabs('primary'),
      haunt,
      haunting,
      potential
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

  async _preparePotentialTab (context: any) {
    const list = context.potential as Ghost[]
    const firstId = list.length > 0 ? list[0].id : null
    this._currentGhost = this._currentGhost ?? firstId
    const ghosts = list.map(ghost => this._addListingClasses(ghost))
    const ghost = list.find(ghost => ghost.id === this._currentGhost)
    const notes = ghost && foundry.applications.ux.TextEditor
      ? await foundry.applications.ux.TextEditor.enrichHTML(ghost.notes)
      : ''

    return {
      ...context,
      isEmpty: context.potential.length < 1,
      ghosts,
      ghost,
      notes,
      editing: this._isEditing
    }
  }

  async _prepareHauntingTab (context: any) {
    return {
      ...context,
      isEmpty: context.haunting.length < 1
    }
  }

  async _onRender (context: any, options: any) {
    await super._onRender(context, options)

    const tabs = new foundry.applications.ux.Tabs({
      navSelector: '.tabs',
      contentSelector: 'section',
      initial: GhostsPanel.INITIAL_TAB,
      group: 'ghosts-tabs'
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

    if (!this._listingHandler) {
      this._listingHandler = this._handleListingClick.bind(this)
      this.element.addEventListener('click', this._listingHandler)
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
    }
  }

  async _handleListingClick (event: Event) {
    const target = event.target as HTMLElement
    const listing = target.closest(`.${GhostsPanel.GHOST_LISTING_CLASS}`) as HTMLElement
    if (!listing) return

    this._currentGhost = listing.dataset.setGhost as string
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
    if (!this._currentGhost) return this._deactivateEditing()

    const fields = {
      haunted: this.element.querySelector('input[name="ghost-haunted-name"]') as HTMLInputElement | null,
      human: this.element.querySelector('input[name="ghost-human-name"]') as HTMLInputElement | null,
      notes: this.element.querySelector('prose-mirror[name="notes"]') as any
    }

    const fn = this._currentTab === 'potential' ? updatePotentialGhost : updateGhost
    await fn(this._currentGhost, {
      names: {
        haunted: fields.haunted?.value,
        human: fields.human?.value
      },
      notes: fields.notes?.value
    })

    this._isEditing = false
    await this.render({ force: true })
  }
}

const displayGhostsPanel = async (): Promise<GhostsPanel> => {
  await registerPartials()
  const panel = new GhostsPanel()
  await panel.render(true)
  return panel
}

export default displayGhostsPanel
