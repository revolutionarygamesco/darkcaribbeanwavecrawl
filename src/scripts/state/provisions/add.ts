import CrawlState, { Provision } from '../state.ts'
import getCrawlState from '../get.ts'
import setProvisions from './set.ts'

const addProvisions = async (
  type: Provision,
  amount: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const sum = previous.provisions[type] + amount
  return await setProvisions(type, sum, previous, save)
}

export default addProvisions
