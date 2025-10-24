import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'
import getActorId from '../../../../utilities/actor-id.ts'
import setTeam from './set.ts'
import warnExempt from '../warn-exempt.ts'

const addToTeam = async (
  side: CrawlTeamSide,
  recruits: Actor | string | (Actor | string)[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const previous = state ?? await getCrawlState()
  const existing = previous.crew.teams[side].members
  const adding = Array.isArray(recruits) ? recruits : [recruits]
  await warnExempt(adding, previous)
  const ids = adding.map(actor => getActorId(actor))
  const newTeam = [...new Set([...existing, ...ids])]
  return await setTeam(side, newTeam, previous, save)
}

export default addToTeam
