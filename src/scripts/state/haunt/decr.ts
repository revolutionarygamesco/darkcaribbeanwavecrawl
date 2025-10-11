import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addHaunt from './add.ts'

const decrHaunt = async (
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await addHaunt(-1, previous, save)
}

export default decrHaunt
