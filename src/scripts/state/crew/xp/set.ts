import type CrawlState from '../../state.ts'
import getCopy from '../../get-copy.ts'
import getActorId from '../../../utilities/actor-id.ts'
import setCrawlState from '../../set.ts'

const setXP = async (
  character: Actor | string,
  position: string,
  value: number,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const id = getActorId(character)
  const copy = await getCopy(state)
  if (!copy.crew.xp[id]) copy.crew.xp[id] = {}
  copy.crew.xp[id][position] = value
  return save ? await setCrawlState(copy) : copy
}

export default setXP
