import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setChapter from './set.ts'

const addChapter = async (
  add: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  return await setChapter(previous.chapter + add, previous, save)
}

export default addChapter
