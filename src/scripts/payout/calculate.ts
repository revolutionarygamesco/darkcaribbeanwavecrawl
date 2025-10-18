import type CrawlState from '../state/state.ts'
import type Payout from './payout.ts'
import getCrawlState from '../state/get.ts'
import getCrewShares from './get-crew-shares.ts'

const calculatePayout = async (
  input: number = 0,
  state?: CrawlState
): Promise<Payout> => {
  const cs = state ?? await getCrawlState()
  const amount = Math.min(input, cs.silver.company)
  const shares = await getCrewShares(cs)
  const perShare = Math.floor(amount / shares.total)

  const payout: Payout = { accounts: {}, total: 0, remaining: 0, perShare }
  for (const account of Object.values(shares.accounts)) {
    const { holder, shares } = account
    payout.accounts[holder.id] = { holder, amount: Math.floor(perShare * shares) }
  }

  payout.total = Object.values(payout.accounts)
    .reduce((acc, curr) => acc + curr.amount, 0)
  payout.remaining = cs.silver.company - payout.total

  return payout
}

export default calculatePayout
