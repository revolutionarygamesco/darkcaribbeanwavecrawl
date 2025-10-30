import { MODULE_ID } from '../../settings.ts'
import calculatePayout from '../../payout/calculate.ts'
import localize from '../../utilities/localize.ts'
import getSilver from '../../state/silver/get.ts'
import payout from '../../payout/pay.ts'

class PayoutDialog extends foundry.applications.api.DialogV2 {
  amount?: HTMLInputElement
  perShareCell?: HTMLTableCellElement
  remainingCell?: HTMLTableCellElement

  getAmount () {
    return parseInt(this.amount?.value ?? '0') || 0
  }

  _onUpdate = async () => {
    if (!this.amount || !this.perShareCell || !this.remainingCell) return
    const { perShare, remaining } = await calculatePayout(this.getAmount())

    this.perShareCell.textContent = perShare.toString()
    this.remainingCell.textContent = remaining.toString()
  }

  async _onRender (context: any, options: any) {
    await super._onRender(context, options)

    this.amount = this.element.querySelector('#payout-amount') as HTMLInputElement
    this.perShareCell = this.element.querySelector('#payout-per-share') as HTMLTableCellElement
    this.remainingCell = this.element.querySelector('#payout-remaining') as HTMLTableCellElement

    this.amount.addEventListener('input', this._onUpdate)
    await this._onUpdate()
  }
}

const openPayoutDialog = async (onComplete?: () => Promise<void>): Promise<void> => {
  {
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
            if (onComplete) await onComplete()
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

export default openPayoutDialog
