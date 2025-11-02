import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'

export const FOULING_HALFLIFE_DAYS = 100

const foulingSpeedFactor = async (state?: CrawlState): Promise<number> => {
  const cs = state ?? await getCrawlState()
  return 1 / (1 + (cs.ship.barnacles / FOULING_HALFLIFE_DAYS))
}

export default foulingSpeedFactor
