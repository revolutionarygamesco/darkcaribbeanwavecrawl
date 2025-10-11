import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import setTeam from './set.ts'

const addToTeam = async (
  side: CrawlTeamSide,
  recruits: Actor | string | (Actor | string)[],
  previous: CrawlState = getCrawlState(),
  skipSave: boolean = false
): Promise<CrawlState> => {
  const existing = previous.crew.teams[side].crew
  const ids = (Array.isArray(recruits) ? recruits : [recruits])
    .map(actor => getActorId(actor))
  const newTeam = [...new Set([...existing, ...ids])]
  return await setTeam(side, newTeam, previous, skipSave)
}

export default addToTeam
