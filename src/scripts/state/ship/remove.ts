import type CrawlState from '../state.ts'
import setCrawlState from '../set.ts'
import getCopy from '../get-copy.ts'

const removeShip = async (
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  delete copy.ship.actor
  return save ? await setCrawlState(copy) : copy
}

export default removeShip
