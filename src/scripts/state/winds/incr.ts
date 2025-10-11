import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addWinds from './add.ts'

const incrWinds = async (
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await addWinds(1, previous, save)
}

export default incrWinds
