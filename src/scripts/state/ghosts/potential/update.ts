import CrawlState, { GhostPatch } from '../../state.ts'
import getCopy from '../../get-copy.ts'
import patchGhost from '../patch.ts'
import setCrawlState from '../../set.ts'

const updatePotentialGhost = async (
  id: string,
  update: GhostPatch,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  const index = copy.ghosts.potential.findIndex(ghost => ghost.id === id)
  if (index < 0) return copy

  copy.ghosts.potential[index] = patchGhost(copy.ghosts.potential[index], update)
  return save ? await setCrawlState(copy) : copy
}

export default updatePotentialGhost
