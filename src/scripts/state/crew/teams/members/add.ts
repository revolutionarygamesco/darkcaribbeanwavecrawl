import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import setTeam from './set.ts'

const addToTeam = async (
  side: CrawlTeamSide,
  recruits: Actor | string | (Actor | string)[],
  previous: CrawlState = getCrawlState(),
  save: boolean = true
): Promise<CrawlState> => {
  const existing = previous.crew.teams[side].members
  const ids = (Array.isArray(recruits) ? recruits : [recruits])
    .map(actor => getActorId(actor))
  const newTeam = [...new Set([...existing, ...ids])]
  return await setTeam(side, newTeam, previous, save)
}

export default addToTeam
