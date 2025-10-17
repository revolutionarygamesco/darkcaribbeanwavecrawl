import type CrawlState from '../state.ts'
import getCopy from '../get-copy.ts'
import setCrawlState from '../set.ts'
import clamp from '../../utilities/clamp.ts'

const setWinds = async (
  value: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.winds = clamp(value, 1, 4)
  return save ? await setCrawlState(copy) : copy
}

export default setWinds
