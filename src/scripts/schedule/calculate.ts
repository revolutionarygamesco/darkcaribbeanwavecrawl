import CrawlState, { Provision } from '../state/state.ts'
import getCrawlState from '../state/get.ts'
import getRosterCount from '../state/crew/roster/count.ts'

const calculateConsumption = async (state?: CrawlState): Promise<Record<Provision, number>> => {
  const cs = state ?? await getCrawlState()
  const count = await getRosterCount(cs)

  return {
    food: cs.provisions.forage ? 0 : count,
    water: Math.floor(count * (7/4)),
    rum: Math.floor(count * (1/4))
  }
}

export default calculateConsumption
