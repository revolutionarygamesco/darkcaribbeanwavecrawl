import initCrawlState from '../../init.ts'
import assign from './assign.ts'

describe('assign', () => {
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'
  const crew = [jack, anne, mary]

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    for (const id of crew) game.actors.set(id, { id } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('assigns a character to a position in a new state', async () => {
    const before = initCrawlState()
    const after = await assign('captain', jack, before, true)
    expect(after.crew.positions.captain).toEqual([jack])
    expect(after).not.toBe(before)
  })

  it('assigns multiple characters to a position in a new state', async () => {
    const before = initCrawlState()
    const after = await assign('gunner', [anne, mary], before, true)
    expect(after.crew.positions.gunner).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('assigns additional characters to a position in a new state', async () => {
    const before = initCrawlState()
    const mid = await assign('gunner', anne, before, true)
    const after = await assign('gunner', mary, mid, true)
    expect(after.crew.positions.gunner).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('removes duplicates', async () => {
    const before = initCrawlState()
    const mid = await assign('gunner', anne, before, true)
    const after = await assign('gunner', [anne, mary], mid, true)
    expect(after.crew.positions.gunner).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })
})
