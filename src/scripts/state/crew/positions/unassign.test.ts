import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import unassign from './unassign.ts'

describe('unassign', () => {
  let before: CrawlState
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'
  const crew = [jack, anne, mary]

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    before = initCrawlState()
    before.crew.positions.captain = { shares: 1, assigned: [jack] }
    before.crew.positions.gunner = { shares: 1, assigned: [anne, mary] }

    game.actors = new Map<string, Actor>()
    for (const id of crew) game.actors.set(id, { id } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('removes a character from a position in a new state', async () => {
    const after = await unassign('captain', jack, before, false)
    expect(after.crew.positions.captain.assigned).toHaveLength(0)
    expect(after).not.toBe(before)
  })

  it('removes multiple characters from a position in a new state', async () => {
    const after = await unassign('gunner', [anne, mary], before, false)
    expect(after.crew.positions.gunner.assigned).toHaveLength(0)
    expect(after).not.toBe(before)
  })

  it('retains other characters', async () => {
    const after = await unassign('gunner', mary, before, false)
    expect(after.crew.positions.gunner.assigned).toEqual([anne])
    expect(after).not.toBe(before)
  })
})
