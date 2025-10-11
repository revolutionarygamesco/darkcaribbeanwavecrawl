import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setSilver from './set.ts'

const addSilver = async (
  amount: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const sum = previous.silver.ship + amount
  return await setSilver(sum, previous, skipSave)
}

export default addSilver
