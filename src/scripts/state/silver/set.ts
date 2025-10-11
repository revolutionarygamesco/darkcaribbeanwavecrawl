import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'

const setSilver = async (
  amount: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.silver.company = Math.max(amount, 0)
  return save ? await setCrawlState(copy) : copy
}

export default setSilver
