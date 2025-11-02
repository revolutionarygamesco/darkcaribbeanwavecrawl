import type CrawlState from '../state.ts'
import getCopy from '../get-copy.ts'
import getActorId from '../../utilities/actor-id.ts'
import setCrawlState from '../set.ts'

const removeFromCrew = async (
  actor: Actor | string,
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState> => {
  const copy = await getCopy(state)
  const remove = getActorId(actor)

  for (const position in copy.crew.positions) {
    copy.crew.positions[position] = copy.crew.positions[position].filter(id => id !== remove)
  }

  const teams = [copy.crew.teams.starboard, copy.crew.teams.larboard]
  for (const team of teams) {
    if (team.helm === remove) team.helm = undefined
    if (team.lookout === remove) team.lookout = undefined
    team.members = team.members.filter(id => id !== remove)
  }

  return save ? await setCrawlState(copy) : copy
}

export default removeFromCrew
