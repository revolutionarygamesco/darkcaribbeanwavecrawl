import initCrawlState from '../../../init.ts'
import getOfficer from './get.ts'

describe('getOfficer', () => {
  it('returns the team’s officer', async () => {
    const init = initCrawlState()
    const actual = await getOfficer('starboard', init)
    expect(actual).toBe(init.crew.teams.starboard.officer)
  })
})
