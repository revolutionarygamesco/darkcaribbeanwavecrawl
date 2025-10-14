import CrawlState, { Provision } from '../state.ts'
import getCopy from '../get-copy.ts'
import setCrawlState from '../set.ts'

const setProvisions = async (
  type: Provision,
  amount: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.provisions[type] = Math.max(amount, 0)
  return save ? await setCrawlState(copy) : copy
}

export default setProvisions
