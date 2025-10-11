import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addHaunt from './add.ts'

const incrHaunt = async (
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await addHaunt(1, previous, skipSave)
}

export default incrHaunt
