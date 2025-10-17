import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addWinds from './add.ts'

const incrWinds = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await addWinds(1, previous, save)
}

export default incrWinds
