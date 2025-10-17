import type CrawlState from '../state.ts'
import setCrawlState from '../set.ts'
import getCopy from '../get-copy.ts'
import clamp from '../../utilities/clamp.ts'

const setChapter = async (
  chapter: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.chapter = clamp(chapter, 1, 6)
  return save ? await setCrawlState(copy) : copy
}

export default setChapter
