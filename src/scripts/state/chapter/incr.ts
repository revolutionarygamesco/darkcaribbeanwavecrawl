import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import addChapter from './add.ts'

const incrChapter = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await addChapter(1, previous, save)
}

export default incrChapter
