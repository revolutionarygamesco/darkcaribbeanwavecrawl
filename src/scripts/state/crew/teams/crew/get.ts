import CrawlState, { CrawlTeamSide } from '../../../state.ts'

const getTeam = (side: CrawlTeamSide, state: CrawlState): Actor[] => {
  return state.crew.teams[side].crew
    .map(id => game.actors.get(id))
    .filter((a: Actor | undefined): a is Actor => a !== undefined)
}

export default getTeam
