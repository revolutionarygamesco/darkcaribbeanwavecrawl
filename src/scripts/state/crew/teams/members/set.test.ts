import initCrawlState from '../../../init.ts'
import setTeam from './set.ts'

describe('setTeam', () => {
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  it('sets the team’s members by ID', async () => {
    const before = initCrawlState()
    const after = await setTeam('starboard', [anne, mary], before, false)
    expect(after.crew.teams.starboard.members).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('sets the team’s members by Actor', async () => {
    const before = initCrawlState()
    const after = await setTeam('starboard', [{ id: anne } as Actor, { id: mary } as Actor], before, false)
    expect(after.crew.teams.starboard.members).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('won’t put anyone on two teams', async () => {
    const before = await setTeam('starboard', [anne, mary], initCrawlState(), false)
    const after = await setTeam('larboard', [mary], before, true)
    expect(after.crew.teams.starboard.members).toEqual([anne])
    expect(after.crew.teams.larboard.members).toEqual([mary])
    expect(after).not.toBe(before)
  })

  it('won’t let you put an officer on the other team', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.officer = 'quartermaster'
    before.crew.teams.larboard.officer = 'master'
    before.crew.positions.quartermaster = [anne]
    const after = await setTeam('larboard', [anne], before, false)
    expect(after.crew.teams.starboard.members).toEqual(before.crew.teams.starboard.members)
  })

  it('won’t let you be the other team’s helm', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.helm = mary
    const after = await setTeam('larboard', [mary], before, false)
    expect(after.crew.teams.starboard.helm).not.toBeDefined()
  })

  it('won’t let you be the other team’s lookout', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.lookout = mary
    const after = await setTeam('larboard', [mary], before, false)
    expect(after.crew.teams.starboard.lookout).not.toBeDefined()
  })
})
