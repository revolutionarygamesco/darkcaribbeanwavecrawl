import CrawlState, { CrawlTeamSide } from '../../../state.ts'
import getCrawlState from '../../../get.ts'

const getHelm = async (
  side: CrawlTeamSide,
  state?: CrawlState
): Promise<Actor | null> => {
  const cs = state ?? await getCrawlState()
  const id = cs.crew.teams[side].helm
  return id ? game.actors.get(id) ?? null : null
}

export default getHelm
