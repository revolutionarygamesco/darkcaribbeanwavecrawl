import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import setCrawlState from '../set.ts'
import clamp from '../../utilities/clamp.ts'

const setWinds = async (
  value: number,
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const copy = { ...previous }
  copy.winds = clamp(value, 1, 4)
  if (!skipSave) await setCrawlState(copy)
  return copy
}

export default setWinds
