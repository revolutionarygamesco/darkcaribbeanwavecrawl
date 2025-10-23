import CrawlState, { CrawlTeamSide, CrawlTeamOfficer } from '../../../state.ts'
import initCrawlState from '../../../init.ts'
import setOfficer from './set.ts'

describe('setOfficer', () => {
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  const setupTeam = (state: CrawlState, side: CrawlTeamSide, officer: CrawlTeamOfficer, assign: string): void => {
    state.crew.teams[side].officer = officer
    state.crew.teams[side].members = [assign]
    state.crew.teams[side].helm = assign
    state.crew.teams[side].lookout = assign
  }

  it('sets the team’s officer', async () => {
    const before = initCrawlState()
    const after = await setOfficer('starboard', 'quartermaster', before, false)
    expect(after.crew.teams.starboard.officer).toBe('quartermaster')
    expect(after.crew.teams.larboard.officer).toBe('master')
    expect(after).not.toBe(before)
  })

  it('moves members to new teams', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    before.crew.positions.master = [mary]
    setupTeam(before, 'starboard', 'quartermaster', anne)
    setupTeam(before, 'larboard', 'master', mary)

    const after = await setOfficer('larboard', 'quartermaster', before, false)

    expect(after.crew.teams.starboard.members).toContain(mary)
    expect(after.crew.teams.larboard.members).toContain(anne)
    expect(after.crew.teams.starboard.members).not.toContain(anne)
    expect(after.crew.teams.larboard.members).not.toContain(mary)
    expect(after.crew.teams.starboard.helm).toBeUndefined()
    expect(after.crew.teams.larboard.helm).toBeUndefined()
    expect(after.crew.teams.starboard.lookout).toBeUndefined()
    expect(after.crew.teams.larboard.lookout).toBeUndefined()
  })
})
