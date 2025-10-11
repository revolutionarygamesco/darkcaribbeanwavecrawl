import CrawlState, { Provision } from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'

const setProvisions = async (
  type: Provision,
  amount: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.provisions[type] = Math.max(amount, 0)
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setProvisions
