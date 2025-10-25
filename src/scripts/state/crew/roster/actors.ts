import type CrawlState from '../../state.ts'
import getRosterIds from './ids.ts'
import mapIdsToActors from '../../../utilities/map-ids-to-actors.ts'

const getRosterActors = async (
  state?: CrawlState
): Promise<Actor[]> => {
  const ids = await getRosterIds(state)
  return mapIdsToActors(ids)
}

export default getRosterActors
