import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setWinds from './set.ts'

const addWinds = async (
  add: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await setWinds(previous.winds + add, previous, skipSave)
}

export default addWinds
