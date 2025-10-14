import type CrawlState from '../state.ts'
import getCopy from '../get-copy.ts'
import setCrawlState from '../set.ts'

const setSilver = async (
  amount: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.silver.company = Math.max(amount, 0)
  return save ? await setCrawlState(copy) : copy
}

export default setSilver
