import initCrawlState from '../init.ts'
import getShip from './get.ts'

describe('getShip', () => {
  let originalActors: Map<string, Actor>
  const id = 'ranger'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(id, { id } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('gets the ship from the state', () => {
    const state = initCrawlState()
    state.ship.actor = id
    const ship = getShip(state)
    expect(ship?.id).toBe(id)
  })

  it('returns null if there is no ship', () => {
    const ship = getShip(initCrawlState())
    expect(ship).toBeNull()
  })

  it('returns null if there is no such actor', () => {
    const state = initCrawlState()
    state.ship.actor = 'nope'
    const ship = getShip(state)
    expect(ship).toBeNull()
  })
})
