import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getBarnacles = async (
  state?: CrawlState
): Promise<number> => {
  return (state ?? await getCrawlState()).ship.barnacles
}

export default getBarnacles
