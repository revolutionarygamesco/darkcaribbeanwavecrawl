import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setChapter from './set.ts'

const addChapter = async (
  add: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  return await setChapter(previous.chapter + add, previous, save)
}

export default addChapter
