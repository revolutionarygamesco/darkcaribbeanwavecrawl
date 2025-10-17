import mapIdsToActors from './map-ids-to-actors.ts'

describe('mapIdsToActors', () => {
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'

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

  it('maps an array of IDs to an array of Actors', () => {
    const actual = mapIdsToActors([jack, 'nope'])
    expect(actual).toEqual([game.actors.get(jack)])
  })
})
