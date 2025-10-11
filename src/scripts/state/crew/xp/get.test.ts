import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import getXP from './get.ts'

describe('getXP', () => {
  let state: CrawlState
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    state = initCrawlState()
    state.crew.xp = { [jack]: { quartermaster: 200, captain: 100 } }
    game.actors = new Map<string, Actor>()
    game.actors.set(jack, { id: jack } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it.each(['quartermaster', 'captain'])('returns Jack’s experience as %s (as ID)', (position) => {
    const actual = getXP(jack, position, state)
    expect(actual).toBe(state.crew.xp[jack][position])
  })

  it.each(['quartermaster', 'captain'])('returns Jack’s experience as %s (as Actor)', (position) => {
    const actual = getXP({ id: jack } as Actor, position, state)
    expect(actual).toBe(state.crew.xp[jack][position])
  })
})
