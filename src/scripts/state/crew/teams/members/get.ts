import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import mapIdsToActors from '../../../../utilities/map-ids-to-actors.ts'

const getTeam = (side: CrawlTeamSide, state: CrawlState): Actor[] => {
  return mapIdsToActors(state.crew.teams[side].members)
}

export default getTeam
