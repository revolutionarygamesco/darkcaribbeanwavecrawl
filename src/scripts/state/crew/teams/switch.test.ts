import initCrawlState from '../../init.ts'
import switchTeams from './switch.ts'

describe('switchTeams', () => {
  it('switches the team on duty', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.onDuty = true
    before.crew.teams.larboard.onDuty = false
    const { starboard, larboard } = (await switchTeams(before, false)).crew.teams
    expect(starboard.onDuty).toBe(false)
    expect(larboard.onDuty).toBe(true)
  })
})
