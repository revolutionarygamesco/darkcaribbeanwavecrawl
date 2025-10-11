import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import setBarnacles from './set.ts'

const addBarnacles = async (
  minutes: number,
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const updated = previous.ship.barnacles + minutes
  return await setBarnacles(updated, previous, save)
}

export default addBarnacles
