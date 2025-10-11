import CrawlState, { Provision } from '../state.ts'
import getCrawlState from '../get.ts'

const getProvisions = (type: Provision, state: CrawlState = getCrawlState()): number => {
  return state.provisions[type]
}

export default getProvisions
