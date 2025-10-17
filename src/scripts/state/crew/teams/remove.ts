import CrawlState, { CrawlTeamSide } from '../../state.ts'
import getActorId from '../../../utilities/actor-id.ts'

const removeTeamMember = (
  side: CrawlTeamSide,
  characters: Actor | string | (Actor | string)[],
  state: CrawlState
): void => {
  const ids = (Array.isArray(characters) ? characters : [characters])
    .map(char => getActorId(char))
  const { members, helm, lookout } = state.crew.teams[side]
  state.crew.teams[side].members = members.filter(id => !ids.includes(id))
  if (helm && ids.includes(helm)) delete state.crew.teams[side].helm
  if (lookout && ids.includes(lookout)) delete state.crew.teams[side].lookout
}

export default removeTeamMember
