import initCrawlState from '../../../init.ts'
import setLookout from './set.ts'

describe('setLookout', () => {
  const anne = 'anne-bonny'

  it('sets character as the team’s designated lookout', async () => {
    const before = initCrawlState()
    const after = await setLookout('starboard', anne, before, true)
    expect(after.crew.teams.starboard.lookout).toBe(anne)
    expect(after.crew.teams.starboard.crew).toContain(anne)
  })

  it('removes character from other crew', async () => {
    const before = initCrawlState()
    before.crew.teams.larboard.crew = [anne]
    const after = await setLookout('starboard', anne, before, true)
    expect(after.crew.teams.larboard.crew).toEqual([])
  })

  it('won’t allow the other team’s officer to take lookout', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    before.crew.teams.larboard = { officer: 'quartermaster', crew: [anne] }
    const after = await setLookout('starboard', anne, before, true)
    expect(after.crew.teams.starboard.lookout).toBeUndefined()
    expect(after.crew.teams.larboard.crew).toEqual([anne])
  })
})
