import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import getActorId from '../../../utilities/actor-id.ts'

const getXP = async (
  character: Actor | string,
  position: string,
  state?: CrawlState
): Promise<number> => {
  const id = getActorId(character)
  const { xp } = (state ?? await getCrawlState()).crew
  if (!(id in xp)) return 0
  if (!(position in xp[id])) return 0
  return xp[id][position]
}

export default getXP
