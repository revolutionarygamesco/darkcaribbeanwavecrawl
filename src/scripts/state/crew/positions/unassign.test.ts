import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import unassign from './unassign.ts'
import getRoster from '../get.ts'

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

  it('adds character to free crewman if removed from other position', async () => {
    const after = await unassign('gunner', mary, before, false)
    expect(after.crew.positions.crewman.assigned).toEqual([mary])
    expect(after).not.toBe(before)
  })

  it('removes character from crew entirely if removed from free crewman', async () => {
    before.crew.positions.gunner.assigned = [anne]
    before.crew.positions.crewman.assigned = [mary]
    const after = await unassign('crewman', mary, before, false)
    const roster = await getRoster(after)
    expect(after.crew.positions.crewman.assigned).toHaveLength(0)
    expect(roster).toHaveLength(2)
    expect(after).not.toBe(before)
  })
})
