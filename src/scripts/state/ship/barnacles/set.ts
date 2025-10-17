import type CrawlState from '../../state.ts'
import getCopy from '../../get-copy.ts'
import setCrawlState from '../../set.ts'

const setBarnacles = async (
  minutes: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  copy.ship.barnacles = minutes
  return save ? await setCrawlState(copy) : copy
}

export default setBarnacles
