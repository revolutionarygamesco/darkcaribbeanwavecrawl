import initCrawlState from '../../../init.ts'
import setLookout from './set.ts'

describe('setLookout', () => {
  const anne = 'anne-bonny'

  it('sets character as the team’s designated lookout', async () => {
    const before = initCrawlState()
    const after = await setLookout('starboard', anne, before, false)
    expect(after.crew.teams.starboard.lookout).toBe(anne)
    expect(after.crew.teams.starboard.members).toContain(anne)
  })

  it('removes character from other members', async () => {
    const before = initCrawlState()
    before.crew.teams.larboard.members = [anne]
    const after = await setLookout('starboard', anne, before, false)
    expect(after.crew.teams.larboard.members).toEqual([])
  })

  it('won’t allow the other team’s officer to take lookout', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    before.crew.teams.larboard = { officer: 'quartermaster', members: [anne], onDuty: true }
    const after = await setLookout('starboard', anne, before, false)
    expect(after.crew.teams.starboard.lookout).toBeUndefined()
    expect(after.crew.teams.larboard.members).toEqual([anne])
  })
})
