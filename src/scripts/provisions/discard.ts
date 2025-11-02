import { Provision, CrawlProvisionStores } from '../state/state.ts'
import getCrawlState from '../state/get.ts'

const discardProvisions = async (
  amount: number,
  stores?: CrawlProvisionStores
): Promise<CrawlProvisionStores> => {
  const types: Provision[] = ['rum', 'food', 'water']
  const { food, water, rum } = stores ?? (await getCrawlState()).provisions
  const after = { food, water, rum }

  let i = 0
  while (amount > 0) {
    const type = types[i % types.length]
    i++
    if (after[type] === 0) continue
    after[type]--
    amount--
  }

  return after
}

export default discardProvisions
