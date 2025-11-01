import CrawlState, { Provision, CrawlProvisionStores } from '../state/state.ts'
import getCrawlState from '../state/get.ts'

const addProvisions = async (
  type: Provision,
  amount: number,
  state?: CrawlState
): Promise<CrawlProvisionStores> => {
  const cs = state ?? await getCrawlState()
  const { food, water, rum } = cs.provisions
  const provisions = { food, water, rum }
  provisions[type] = Math.max(provisions[type] + amount, 0)
  return provisions
}

export default addProvisions
