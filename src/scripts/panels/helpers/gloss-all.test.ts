import { MODULE_ID } from '../../settings.ts'
import initCrawlState from '../../state/init.ts'
import glossAllPositions from './gloss-all.ts'

describe('glossAllPositions', () => {
  const before = initCrawlState()
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  before.crew.positions.captain.assigned = [jack]

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(jack, { id: jack } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('glosses all positions', async () => {
    const actual = await glossAllPositions(before)
    const { assigned, actors, shares, title, description, sans } = actual.captain
    expect(assigned).toEqual([jack])
    expect(actors).toEqual([game.actors.get(jack)])
    expect(shares).toBe(before.crew.positions.captain.shares)
    expect(title).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.title`)
    expect(description).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.desc`)
    expect(sans).toBe(`${MODULE_ID}.crew-panel.positions.glossary.captain.sans`)
  })
})
