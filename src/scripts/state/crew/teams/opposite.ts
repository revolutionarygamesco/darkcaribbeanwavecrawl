import { CrawlTeamSide } from '../../state.ts'

const getOppositeSide = (input: CrawlTeamSide): CrawlTeamSide => {
  return input === 'starboard' ? 'larboard' : 'starboard'
}

export default getOppositeSide
