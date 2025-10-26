import type CrawlState from '../state/state.ts'
import type Payout from './payout.ts'
import getCopy from '../state/get-copy.ts'
import setCrawlState from '../state/set.ts'
import calculatePayout from './calculate.ts'

const payout = async (
  input: number = 0,
  state?: CrawlState
): Promise<Payout> => {
  const copy = await getCopy(state)
  const payout = await calculatePayout(input, copy)

  for (const account of Object.values(payout.accounts)) {
    const { holder, amount } = account
    const before = holder.system?.silver ?? 0
    await holder.update({ 'system.silver': before + amount })
  }

  copy.silver.company = payout.remaining
  await setCrawlState(copy)
  return payout
}

export default payout
