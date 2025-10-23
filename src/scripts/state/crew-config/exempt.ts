import type CrawlState from '../state.ts'
import type CrewConfig from './crew-config.ts'
import getCrawlState from '../get.ts'
import getCrewConfig from './get.ts'
import getActorId from '../../utilities/actor-id.ts'

const isExempt = async (
  subject: Actor | string,
  state?: CrawlState,
  config?: CrewConfig
): Promise<boolean> => {
  const cs = (state ?? await getCrawlState())
  const conf = config ?? getCrewConfig()
  const id = getActorId(subject)

  const exemptions = Object.keys(cs.crew.positions)
    .filter(key => cs.crew.positions[key].includes(id))
    .map(key => conf[key as keyof CrewConfig]?.exempt === true)
  return exemptions.some(val => val)
}

export default isExempt
