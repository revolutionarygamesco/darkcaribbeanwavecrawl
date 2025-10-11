import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'

const getChapter = (state: CrawlState = getCrawlState()): number => {
  return state.chapter
}

export default getChapter
