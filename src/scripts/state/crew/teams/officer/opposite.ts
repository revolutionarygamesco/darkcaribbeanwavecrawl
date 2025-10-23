import { CrawlTeamOfficer } from '../../../state.ts'

const getOppositeOfficer = (input: CrawlTeamOfficer): CrawlTeamOfficer => {
  return input === 'quartermaster' ? 'master' : 'quartermaster'
}

export default getOppositeOfficer
