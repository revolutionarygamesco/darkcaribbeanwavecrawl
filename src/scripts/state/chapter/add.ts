import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setChapter from './set.ts'

const addChapter = async (
  add: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  return await setChapter(previous.chapter + add, previous, skipSave)
}

export default addChapter
