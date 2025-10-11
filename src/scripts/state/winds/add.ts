import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setWinds from './set.ts'

const addWinds = async (
  add: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await setWinds(previous.winds + add, previous, save)
}

export default addWinds
