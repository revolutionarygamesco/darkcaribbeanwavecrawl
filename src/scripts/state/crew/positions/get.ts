import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import mapIdsToActors from '../../../utilities/map-ids-to-actors.ts'

const getAssigned = async (
  position: string,
  state?: CrawlState
): Promise<Actor[]> => {
  const cs = state ?? await getCrawlState()
  if (!(position in cs.crew.positions)) return []
  return mapIdsToActors(cs.crew.positions[position])
}

export default getAssigned
