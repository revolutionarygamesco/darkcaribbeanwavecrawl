import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import setCrawlState from '../../../set.ts'
import cloneCrawlState from '../../../clone.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import getOppositeSide from '../opposite.ts'

const setTeam = async (
  side: CrawlTeamSide,
  crew: (Actor | string)[],
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const opp = getOppositeSide(side)
  const otherOfficer = previous.crew.teams[opp].officer
  const otherOfficers = previous.crew.positions[otherOfficer] ?? []
  const ids = crew
    .map(member => getActorId(member))
    .filter(id => !otherOfficers.includes(id))
  if (otherOfficers.length > 1 && ids.length < 1) return previous

  const copy = cloneCrawlState(previous)
  copy.crew.teams[side].crew = ids

  // Can't be on both teams
  const { helm, lookout, crew: team } = copy.crew.teams[opp]
  copy.crew.teams[opp].crew = team.filter(id => !ids.includes(id))
  if (helm && ids.includes(helm)) delete copy.crew.teams[opp].helm
  if (lookout && ids.includes(lookout)) delete copy.crew.teams[opp].lookout

  return skipSave ? copy : await setCrawlState(copy)
}

export default setTeam
