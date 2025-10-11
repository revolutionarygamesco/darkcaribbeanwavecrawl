import initCrawlState from '../../../init.ts'
import addToTeam from './add.ts'

describe('addToTeam', () => {
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  it('adds one member by ID', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne]
    const after = await addToTeam('starboard', mary, before, true)
    expect(after.crew.teams.starboard.crew).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('adds multiple members by ID', async () => {
    const actual = await addToTeam('starboard', [anne, mary], initCrawlState(), true)
    expect(actual.crew.teams.starboard.crew).toEqual([anne, mary])
  })

  it('adds one member as Actor', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne]
    const after = await addToTeam('starboard', { id: mary } as Actor, before, true)
    expect(after.crew.teams.starboard.crew).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('adds multiple members as Actors', async () => {
    const a = { id: anne } as Actor
    const m = { id: mary } as Actor
    const actual = await addToTeam('starboard', [a, m], initCrawlState(), true)
    expect(actual.crew.teams.starboard.crew).toEqual([anne, mary])
  })

  it('deduplicates', async () => {
    const before = initCrawlState()
    before.crew.teams.starboard.crew = [anne]
    const after = await addToTeam('starboard', [anne, mary], before, true)
    expect(after.crew.teams.starboard.crew).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })
})
