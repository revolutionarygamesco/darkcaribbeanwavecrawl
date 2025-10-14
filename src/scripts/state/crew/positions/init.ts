import type CrawlState from '../../state.ts'
import setCrawlState from '../../set.ts'
import getCopy from '../../get-copy.ts'

const initPosition = async (
  position: string,
  shares: number = 1,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  if (copy.crew.positions[position]) return copy
  copy.crew.positions[position] = { shares, assigned: [] }
  return save ? setCrawlState(copy) : copy
}

export default initPosition
