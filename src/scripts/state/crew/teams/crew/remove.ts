import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import setTeam from './set.ts'

const removeFromTeam = async (
  side: CrawlTeamSide,
  removals: Actor | string | (Actor | string)[],
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const ids = (Array.isArray(removals) ? removals : [removals])
    .map(actor => getActorId(actor))
  const newTeam = previous.crew.teams[side].crew
    .filter(id => !ids.includes(id))
  return await setTeam(side, newTeam, previous, save)
}

export default removeFromTeam
