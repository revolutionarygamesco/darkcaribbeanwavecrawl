import CrawlState, { GhostPatch } from '../../state.ts'
import getCopy from '../../get-copy.ts'
import patchGhost from '../patch.ts'
import setCrawlState from '../../set.ts'

const updateGhost = async (
  id: string,
  update: GhostPatch,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  const index = copy.ghosts.haunting.findIndex(ghost => ghost.id === id)
  if (index < 0) return copy

  copy.ghosts.haunting[index] = patchGhost(copy.ghosts.haunting[index], update)
  return save ? await setCrawlState(copy) : copy
}

export default updateGhost
