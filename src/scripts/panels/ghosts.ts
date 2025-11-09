import { MODULE_ID } from '../settings.ts'

import getPanelDimensions from '../utilities/get-dimensions.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'
import getGhosts from '../state/ghosts/get.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class GhostsPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  static INITIAL_TAB = 'potential'

  static _path = [MODULE_ID, 'ghosts-panel']
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null
  private _currentTab: string = GhostsPanel.INITIAL_TAB

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
    return {
      ...context,
      isEmpty: context.potential.length < 1
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
  }

  async _handleButtonClick (event: Event) {
    console.log(event)
  }
}

const displayGhostsPanel = async (): Promise<GhostsPanel> => {
  await registerPartials()
  const panel = new GhostsPanel()
  await panel.render(true)
  return panel
}

export default displayGhostsPanel
