import { MODULE_ID } from '../settings.ts'
import { Provision } from '../state/state.ts'

import getPanelDimensions from '../utilities/get-dimensions.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'
import getShip from '../state/ship/get.ts'
import getSilver from '../state/silver/get.ts'
import getProvisions from '../state/provisions/get.ts'
import getCrewShares from '../payout/get-crew-shares.ts'
import openPayoutDialog from './dialogs/payout.ts'
import openAdjustResourceDialog from './dialogs/adjust-resource.ts'

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api

export class LedgerPanel extends HandlebarsApplicationMixin(ApplicationV2) {
  private _buttonHandler: ((event: Event) => Promise<void>) | null = null

  static DEFAULT_OPTIONS = {
    id: `${MODULE_ID}-ledger`,
    tag: 'section',
    classes: ['ledger-panel'],
    window: {
      frame: false,
      resizable: false,
      minimizable: false
    },
    position: getPanelDimensions(880, 670)
  }

  static PARTS = {
    ledger: {
      template: `./modules/${MODULE_ID}/templates/ledger.hbs`
    }
  }

  static async _getCrewSize () {
    const ship = await getShip()
    return ship?.system?.attributes?.crew?.value ?? -1
  }

  static async _prepareSilver () {
    const prefix = [MODULE_ID, 'ledger-panel', 'stock'].join('.')

    return {
      name: localize(prefix + '.name'),
      amount: (await getSilver()).toLocaleString(),
      units: prefix + '.units',
      action: 'adjust-silver',
      tooltip: localize(prefix + '.tooltip')
    }
  }

  static async _prepareProvision (type: Provision) {
    const prefix = [MODULE_ID, 'ledger-panel', 'provisions', 'types', type].join('.')
    const amount = await getProvisions(type)
    const crew = await LedgerPanel._getCrewSize()
    const estimate = crew > 0 ? Math.floor(amount / crew).toLocaleString() : undefined

    return {
      name: localize(prefix + '.name'),
      units: `${MODULE_ID}.ledger-panel.provisions.units`,
      amount: amount.toLocaleString(),
      estimate,
      action: `adjust-${type}`,
      tooltip: localize(prefix + '.tooltip')
    }
  }

  async _prepareContext() {
    const { accounts, total } = await getCrewShares()

    return {
      silver: await LedgerPanel._prepareSilver(),
      accounts: Object.values(accounts),
      totalShares: total,
      food: await LedgerPanel._prepareProvision('food'),
      water: await LedgerPanel._prepareProvision('water'),
      rum: await LedgerPanel._prepareProvision('rum')
    }
  }

  async _onRender(context: any, options: any) {
    await super._onRender(context, options)

    if (!this._buttonHandler) {
      this._buttonHandler = this._handleButtonClick.bind(this)
      this.element.addEventListener('click', this._buttonHandler)
    }
  }

  async _handleButtonClick (event: Event) {
    const target = event.target as HTMLElement
    const button = target.closest('button') as HTMLElement
    if (!button) return
    const rerender = async () => { await this.render({ force: true }) }

    switch (button.dataset.action) {
      case 'close-ledger': await this.close(); break
      case 'adjust-silver': return await openAdjustResourceDialog('silver', rerender)
      case 'adjust-food': return await openAdjustResourceDialog('food', rerender)
      case 'adjust-water': return await openAdjustResourceDialog('water', rerender)
      case 'adjust-rum': return await openAdjustResourceDialog('rum', rerender)
      case 'payout': return await openPayoutDialog(rerender)
    }
  }
}

const displayLedgerPanel = async (): Promise<LedgerPanel> => {
  await registerPartials()
  const panel = new LedgerPanel()
  await panel.render(true)
  return panel
}

export default displayLedgerPanel
