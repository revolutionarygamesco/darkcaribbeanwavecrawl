import initCrawlState from '../../../init.ts'
import setHelm from './set.ts'

describe('setHelm', () => {
  const anne = 'anne-bonny'

  it('sets character as the team’s designated helmsman', async () => {
    const before = initCrawlState()
    const after = await setHelm('starboard', anne, before, true)
    expect(after.crew.teams.starboard.helm).toBe(anne)
    expect(after.crew.teams.starboard.crew).toContain(anne)
  })

  it('removes character from other crew', async () => {
    const before = initCrawlState()
    before.crew.teams.larboard.crew = [anne]
    const after = await setHelm('starboard', anne, before, true)
    expect(after.crew.teams.larboard.crew).toEqual([])
  })

  it('won’t allow the other team’s officer to take the helm', async () => {
    const before = initCrawlState()
    before.crew.positions.quartermaster = [anne]
    before.crew.teams.larboard = { officer: 'quartermaster', crew: [anne] }
    const after = await setHelm('starboard', anne, before, true)
    expect(after.crew.teams.starboard.helm).toBeUndefined()
    expect(after.crew.teams.larboard.crew).toEqual([anne])
  })
})
