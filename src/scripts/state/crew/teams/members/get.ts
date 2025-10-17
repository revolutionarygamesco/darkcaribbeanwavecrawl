import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import mapIdsToActors from '../../../../utilities/map-ids-to-actors.ts'

const getTeam = async (
  side: CrawlTeamSide,
  state?: CrawlState
): Promise<Actor[]> => {
  const cs = state ?? await getCrawlState()
  return mapIdsToActors(cs.crew.teams[side].members)
}

export default getTeam
