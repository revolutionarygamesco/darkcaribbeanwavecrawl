import type CrawlState from '../state.ts'
import getCrawlState from '../get.ts'
import getPositionConfig from './get-position.ts'
import getActorId from '../../utilities/actor-id.ts'

const isExempt = async (
  subject: Actor | string,
  state?: CrawlState
): Promise<boolean> => {
  const cs = (state ?? await getCrawlState())
  const id = getActorId(subject)

  const exemptions = Object.keys(cs.crew.positions)
    .filter(key => cs.crew.positions[key].includes(id))
    .map(key => getPositionConfig(key)?.exempt === true)
  return exemptions.some(val => val)
}

export default isExempt
