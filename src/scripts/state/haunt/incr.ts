import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addHaunt from './add.ts'

const incrHaunt = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await addHaunt(1, previous, save)
}

export default incrHaunt
