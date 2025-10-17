import { CrawlTeamOfficer } from '../../../state.ts'

const getOppositeOfficer = (input: CrawlTeamOfficer): CrawlTeamOfficer => {
  return input === 'quartermaster' ? 'sailing-master' : 'quartermaster'
}

export default getOppositeOfficer
