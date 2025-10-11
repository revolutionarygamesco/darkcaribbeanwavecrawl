import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setHaunt from './set.ts'

const addHaunt = async (
  add: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await setHaunt(previous.haunt + add, previous, skipSave)
}

export default addHaunt
