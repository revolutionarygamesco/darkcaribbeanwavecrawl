import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setSilver from './set.ts'

const addSilver = async (
  amount: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  const sum = previous.silver.company + amount
  return await setSilver(sum, previous, save)
}

export default addSilver
