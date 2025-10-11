import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addChapter from './add.ts'

const decrChapter = async (
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await addChapter(-1, previous, save)
}

export default decrChapter
