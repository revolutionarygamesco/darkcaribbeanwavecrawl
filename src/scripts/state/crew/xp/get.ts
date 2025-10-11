import type CrawlState from '../../state.ts'
import getActorId from '../../../utilities/actor-id.ts'

const getXP = (character: Actor | string, position: string, state: CrawlState): number => {
  const id = getActorId(character)
  if (!(id in state.crew.xp)) return 0
  if (!(position in state.crew.xp[id])) return 0
  return state.crew.xp[id][position]
}

export default getXP
