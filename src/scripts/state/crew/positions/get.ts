import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import mapIdsToActors from '../../../utilities/map-ids-to-actors.ts'

const getAssigned = async (
  position: string,
  state?: CrawlState
): Promise<Actor[]> => {
  const cs = state ?? await getCrawlState()
  const pos = cs.crew.positions[position]
  const ids = pos && pos.assigned ? pos.assigned : []
  return mapIdsToActors(ids)
}

export default getAssigned
