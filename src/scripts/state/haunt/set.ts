import type CrawlState from '../state.ts'
import setCrawlState from '../set.ts'
import getCopy from '../get-copy.ts'
import clamp from '../../utilities/clamp.ts'

const setHaunt = async (
  value: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.haunt = clamp(value, 1, 3)
  return save ? await setCrawlState(copy) : copy
}

export default setHaunt
