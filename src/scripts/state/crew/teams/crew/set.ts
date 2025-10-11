import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import setCrawlState from '../../../set.ts'
import cloneCrawlState from '../../../clone.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import getOppositeSide from '../opposite.ts'
import removeTeamMember from '../remove.ts'

const setTeam = async (
  side: CrawlTeamSide,
  crew: (Actor | string)[],
  previous: CrawlState = getCrawlState(),
  save: boolean = true
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
  removeTeamMember(opp, ids, copy)
  return save ? await setCrawlState(copy) : copy
}

export default setTeam
