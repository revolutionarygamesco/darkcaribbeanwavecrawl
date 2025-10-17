import type CrawlState from './state.ts'
import getCrawlState from './get.ts'
import cloneCrawlState from './clone.ts'

const getCopy = async (original?: CrawlState): Promise<CrawlState> => {
  return cloneCrawlState(original ?? await getCrawlState())
}

export default getCopy
