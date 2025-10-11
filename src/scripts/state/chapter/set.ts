import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'
import clamp from '../../utilities/clamp.ts'

const setChapter = async (
  chapter: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.chapter = clamp(chapter, 1, 6)
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setChapter
