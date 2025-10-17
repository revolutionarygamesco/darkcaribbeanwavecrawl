import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setHaunt from './set.ts'

const addHaunt = async (
  add: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await setHaunt(previous.haunt + add, previous, save)
}

export default addHaunt
