import CrawlState from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import setCrawlState from '../../../set.ts'
import initPosition from '../init.ts'

const setShares = async (
  position: string,
  shares: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  let copy = await initPosition(position, 1, previous)
  copy.crew.positions[position].shares = shares
  return save ? await setCrawlState(copy) : copy
}

export default setShares
