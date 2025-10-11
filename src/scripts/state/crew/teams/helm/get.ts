import CrawlState, { CrawlTeamSide } from '../../../state.ts'

const getHelm = (side: CrawlTeamSide, state: CrawlState): Actor | null => {
  const id = state.crew.teams[side].helm
  return id ? game.actors.get(id) ?? null : null
}

export default getHelm
