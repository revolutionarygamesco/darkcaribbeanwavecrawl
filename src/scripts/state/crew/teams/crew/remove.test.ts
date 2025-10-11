import initCrawlState from '../../../init.ts'
import removeFromTeam from './remove.ts'

describe('removeFromTeam', () => {
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  it('removes one member by ID', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne, mary]
    const after = await removeFromTeam('starboard', mary, before, false)
    expect(after.crew.teams.starboard.crew).toEqual([anne])
    expect(after).not.toBe(before)
  })

  it('removes multiple members by ID', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne, mary]
    const after = await removeFromTeam('starboard', [anne, mary], before, false)
    expect(after.crew.teams.starboard.crew).toEqual([])
    expect(after).not.toBe(before)
  })

  it('removes one member as Actor', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne, mary]
    const after = await removeFromTeam('starboard', { id: mary } as Actor, before, false)
    expect(after.crew.teams.starboard.crew).toEqual([anne])
    expect(after).not.toBe(before)
  })

  it('removes multiple members as Actor', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne, mary]
    const a = { id: anne } as Actor
    const m = { id: mary } as Actor
    const after = await removeFromTeam('starboard', [a, m], before, false)
    expect(after.crew.teams.starboard.crew).toEqual([])
    expect(after).not.toBe(before)
  })
})
