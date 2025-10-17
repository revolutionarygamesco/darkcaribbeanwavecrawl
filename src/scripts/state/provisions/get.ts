import CrawlState, { Provision } from '../state.ts'
import getCrawlState from '../get.ts'

const getProvisions = async (
  type: Provision,
  state?: CrawlState
): Promise<number> => {
  return (state ?? await getCrawlState()).provisions[type]
}

export default getProvisions
