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
    before.crew.positions.captain = [jack]
    before.crew.positions.gunner = [anne, mary]

    game.actors = new Map<string, Actor>()
    for (const id of crew) game.actors.set(id, { id } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('returns a roster of every character on the members', () => {
    const actual = getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })

  it('removes duplicates from multiple positions', () => {
    before.crew.positions.quartermaster = [anne]
    before.crew.positions['sailing-master'] = [mary]
    const actual = getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })
})
