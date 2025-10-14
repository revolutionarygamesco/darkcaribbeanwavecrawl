import type CrawlState from '../state.ts'
import initCrawlState from '../init.ts'
import getRoster from './get.ts'

describe('getRoster', () => {
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

  it('returns a roster of every character on the members', async () => {
    const actual = await getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })

  it('removes duplicates from multiple positions', async () => {
    before.crew.positions.quartermaster = { shares: 1, assigned: [anne] }
    before.crew.positions['sailing-master'] = { shares: 1, assigned: [mary] }
    const actual = await getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })
})
