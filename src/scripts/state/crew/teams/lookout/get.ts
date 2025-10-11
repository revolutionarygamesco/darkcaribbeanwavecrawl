import CrawlState, { CrawlTeamSide } from '../../../state.ts'

const getLookout = (side: CrawlTeamSide, state: CrawlState): Actor | null => {
  const id = state.crew.teams[side].lookout
  return id ? game.actors.get(id) ?? null : null
}

export default getLookout
