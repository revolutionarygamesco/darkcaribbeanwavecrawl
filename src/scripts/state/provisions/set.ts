import CrawlState, { Provision } from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'

const setProvisions = async (
  type: Provision,
  amount: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.provisions[type] = Math.max(amount, 0)
  return save ? await setCrawlState(copy) : copy
}

export default setProvisions
