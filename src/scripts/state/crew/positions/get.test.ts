import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import getAssigned from './get.ts'

describe('getAssigned', () => {
  let state: CrawlState
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(jack, { id: jack } as Actor)

    state = initCrawlState()
    state.crew.positions.captain = { shares: 1, assigned: [jack] }
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('gets the characters assigned to a position from the state', async () => {
    const captains = await getAssigned('captain', state)
    expect(captains).toHaveLength(1)
    expect(captains[0].id).toBe(jack)
  })
})
