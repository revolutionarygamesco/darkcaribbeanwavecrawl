import initCrawlState from '../../../init.ts'
import setOfficer from './set.ts'

describe('setOfficer', () => {
  const anne = 'anne-bonny'
  it('sets the team’s officer', async () => {
    const before = initCrawlState()
    const after = await setOfficer('starboard', 'quartermaster', before, false)
    expect(after.crew.teams.starboard.officer).toBe('quartermaster')
    expect(after.crew.teams.larboard.officer).toBe('sailing-master')
    expect(after).not.toBe(before)
  })

  it('moves members to new teams', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    before.crew.teams.larboard.members = [anne]
    before.crew.teams.larboard.helm = anne
    before.crew.teams.larboard.lookout = anne

    const after = await setOfficer('starboard', 'quartermaster', before, false)
    expect(after.crew.teams.starboard.members).toContain(anne)
    expect(after.crew.teams.larboard.members).not.toContain(anne)
    expect(after.crew.teams.larboard.helm).toBeUndefined()
    expect(after.crew.teams.larboard.lookout).toBeUndefined()
  })
})
