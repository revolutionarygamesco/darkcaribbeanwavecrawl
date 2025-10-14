import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setWinds from './set.ts'

const addWinds = async (
  add: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await setWinds(previous.winds + add, previous, save)
}

export default addWinds
