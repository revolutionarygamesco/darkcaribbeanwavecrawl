import initCrawlState from '../../../init.ts'
import setHelm from './set.ts'

describe('setHelm', () => {
  const anne = 'anne-bonny'

  it('sets character as the team’s designated helmsman', async () => {
    const before = initCrawlState()
    const after = await setHelm('starboard', anne, before, false)
    expect(after.crew.teams.starboard.helm).toBe(anne)
    expect(after.crew.teams.starboard.members).toContain(anne)
  })

  it('removes character from other members', async () => {
    const before = initCrawlState()
    before.crew.teams.larboard.members = [anne]
    const after = await setHelm('starboard', anne, before, false)
    expect(after.crew.teams.larboard.members).toEqual([])
  })

  it('won’t allow the other team’s officer to take the helm', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = { shares: 1, assigned: [anne] }
    before.crew.teams.larboard = { officer: 'quartermaster', members: [anne], onDuty: true }
    const after = await setHelm('starboard', anne, before, false)
    expect(after.crew.teams.starboard.helm).toBeUndefined()
    expect(after.crew.teams.larboard.members).toEqual([anne])
  })
})
