import { MODULE_ID } from '../settings.ts'
import { Provision } from '../state/state.ts'

import PayoutDialog from './payout.ts'
import getPanelDimensions from '../utilities/get-dimensions.ts'
import registerPartials from './register-partials.ts'
import localize from '../utilities/localize.ts'
import getShip from '../state/ship/get.ts'
import getSilver from '../state/silver/get.ts'
import getProvisions from '../state/provisions/get.ts'
import addSilver from '../state/silver/add.ts'
import addProvisions from '../state/provisions/add.ts'
import getCrewShares from '../payout/get-crew-shares.ts'
import payout from '../payout/pay.ts'

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
    return ship?.system.attributes?.crew?.value ?? -1
  }

  static async _prepareSilver () {
    const prefix = [MODULE_ID, 'ledger-panel', 'stock'].join('.')
    const units = prefix + '.units'
    const amount = await getSilver()

    return {
      name: localize(prefix + '.name'),
      amount: `${amount} ${localize(units)}`,
      action: 'adjust-silver',
      tooltip: localize(prefix + '.tooltip')
    }
  }

  static async _prepareProvision (type: Provision) {
    const prefix = [MODULE_ID, 'ledger-panel', 'provisions', 'types', type].join('.')
    const units = prefix + '.units'
    const amount = await getProvisions(type)
    const crew = await LedgerPanel._getCrewSize()
    const estimate = crew > 0
      ? [
          localize(prefix + '.estimate.pre'),
          Math.floor(amount / crew).toString(),
          localize(prefix + '.estimate.post')
        ].join(' ')
      : undefined

    return {
      name: localize(prefix + '.name'),
      amount: `${amount} ${localize(units)}`,
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

    switch (button.dataset.action) {
      case 'close-ledger': await this.close(); break
      case 'adjust-silver': return await this.adjustResource('silver')
      case 'adjust-food': return await this.adjustResource('food')
      case 'adjust-water': return await this.adjustResource('water')
      case 'adjust-rum': return await this.adjustResource('rum')
      case 'payout': return await this.openPayoutDialog()
    }
  }

  parsAdjustResource (coll: HTMLFormControlsCollection, field: string, fallback: number): number {
    const input = coll[field as any] as HTMLInputElement
    const parsed = parseInt(input.value)
    return isNaN(parsed) ? fallback : parsed
  }

  async _adjustResource (type: Provision | 'silver', amount: number) {
    type === 'silver' ? await addSilver(amount) : await addProvisions(type, amount)
    await this.render({ force: true })
  }

  async adjustResource (type: Provision | 'silver') {
    const prefix = [MODULE_ID, 'ledger-panel', 'adjust'].join('.')
    const name = `adjust-${type}`
    const title = localize(`${prefix}.types.${type}.title`)
    const note = type === 'silver' ? '' : `<p class="note">${localize(`${prefix}.types.${type}.note`)}</p>`

    const dialog = new foundry.applications.api.DialogV2({
      id: `${MODULE_ID}-adjust-resource`,
      window: { title },
      content: `
        <input type="number" id="${name}" name="${name}" value="0" min="0" />
        ${note}
      `,
      buttons: [
        {
          action: 'add',
          label: localize(`${prefix}.actions.add`),
          callback: async (_event: Event, button: HTMLButtonElement) => {
            const coll = button.form?.elements
            if (!coll) return

            const amount = this.parsAdjustResource(coll, name, 0)
            return await this._adjustResource(type, amount)
          }
        },
        {
          action: 'sub',
          label: localize(`${prefix}.actions.sub`),
          callback: async (_event: Event, button: HTMLButtonElement) => {
            const coll = button.form?.elements
            if (!coll) return

            const amount = this.parsAdjustResource(coll, name, 0) * -1
            return await this._adjustResource(type, amount)
          }
        },
        {
          action: 'cancel',
          label: localize(`${prefix}.actions.cancel`),
          callback: async () => {
            await dialog.close()
          }
        }
      ]
    })

    await dialog.render(true)
  }

  async openPayoutDialog () {
    const prefix = [MODULE_ID, 'ledger-panel', 'payout', 'dialog'].join('.')
    const title = localize(`${prefix}.title`)
    const stock = await getSilver()

    const dialog = new PayoutDialog({
      id: `${MODULE_ID}-payout`,
      window: { title },
      content: `
        <label for="payout-amount">${localize(prefix + '.amount')}</label>
        <input type="number" id="payout-amount" name="amount" value="0" min="0" max="${stock}" />
        <table class="payout-estimation">
          <tbody>
            <tr>
              <th>${localize(prefix + '.estimates.per-share')}</th>
              <td id="payout-per-share">0</td>
            </tr>
            <tr>
              <th>${localize(prefix + '.estimates.remaining')}</th>
              <td id="payout-remaining">${stock}</td>
            </tr>
          </tbody>
        </table>
      `,
      buttons: [
        {
          action: 'pay',
          label: localize(`${prefix}.actions.pay`),
          callback: async () => {
            await payout(dialog.getAmount())
            await this.render({ force: true })
          }
        },
        {
          action: 'cancel',
          label: localize(`${prefix}.actions.cancel`),
          callback: async () => {
            await dialog.close()
          }
        }
      ]
    })

    await dialog.render(true)
  }
}

const displayLedgerPanel = async (): Promise<void> => {
  await registerPartials()
  const panel = new LedgerPanel()
  await panel.render(true)
}

export default displayLedgerPanel
