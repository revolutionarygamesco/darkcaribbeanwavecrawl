import CrawlState, { Ghost } from '../../state.ts'
import getCopy from '../../get-copy.ts'
import getGhostIDs from '../ids.ts'
import setCrawlState from '../../set.ts'

const removeGhost = async (
  ghosts: Partial<Ghost> | string | Array<Partial<Ghost> | string>,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  const arr = getGhostIDs(Array.isArray(ghosts) ? ghosts : [ghosts])
  copy.ghosts.haunting = copy.ghosts.haunting.filter(ghost => !arr.includes(ghost.id))
  return save ? await setCrawlState(copy) : copy
}

export default removeGhost
