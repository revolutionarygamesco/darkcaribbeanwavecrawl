import calculatePayout from '../payout/calculate.ts'

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

export default PayoutDialog
