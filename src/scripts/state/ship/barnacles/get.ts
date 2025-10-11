import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

const getBarnacles = (state: CrawlState = getCrawlState()): number => {
  return state.ship.barnacles
}

export default getBarnacles
