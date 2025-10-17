import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getChapter = async (
  state?: CrawlState
): Promise<number> => {
  return (state ?? await getCrawlState()).chapter
}

export default getChapter
