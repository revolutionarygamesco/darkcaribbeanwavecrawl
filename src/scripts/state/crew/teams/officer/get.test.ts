import initCrawlState from '../../../init.ts'
import getOfficer from './get.ts'

describe('getOfficer', () => {
  it('returns the team’s officer', () => {
    const init = initCrawlState()
    const actual = getOfficer('starboard', init)
    expect(actual).toBe(init.crew.teams.starboard.officer)
  })
})
