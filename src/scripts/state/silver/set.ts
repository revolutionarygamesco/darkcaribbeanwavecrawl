import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'

const setSilver = async (
  amount: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.silver.ship = Math.max(amount, 0)
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setSilver
