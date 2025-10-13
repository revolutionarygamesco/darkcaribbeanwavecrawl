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
    const after = await assign('captain', jack, before, false)
    const { assigned, shares } = after.crew.positions.captain
    expect(shares).toBe(2)
    expect(assigned).toEqual([jack])
    expect(after).not.toBe(before)
  })

  it('assigns multiple characters to a position in a new state', async () => {
    const before = initCrawlState()
    const after = await assign('gunner', [anne, mary], before, false)
    const { assigned, shares } = after.crew.positions.gunner
    expect(shares).toBe(1.5)
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('assigns additional characters to a position in a new state', async () => {
    const before = initCrawlState()
    const mid = await assign('gunner', anne, before, false)
    const after = await assign('gunner', mary, mid, false)
    const { assigned, shares } = after.crew.positions.gunner
    expect(shares).toBe(1.5)
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('removes duplicates', async () => {
    const before = initCrawlState()
    const mid = await assign('gunner', anne, before, false)
    const after = await assign('gunner', [anne, mary], mid, false)
    const { assigned, shares } = after.crew.positions.gunner
    expect(shares).toBe(1.5)
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })
})
