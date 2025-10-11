import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import cloneCrawlState from '../clone.ts'
import clamp from '../../utilities/clamp.ts'

const setHaunt = async (
  value: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const copy = cloneCrawlState(previous)
  copy.haunt = clamp(value, 1, 3)
  return save ? await setCrawlState(copy) : copy
}

export default setHaunt
