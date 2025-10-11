import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addChapter from './add.ts'

const incrChapter = async (
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await addChapter(1, previous, skipSave)
}

export default incrChapter
