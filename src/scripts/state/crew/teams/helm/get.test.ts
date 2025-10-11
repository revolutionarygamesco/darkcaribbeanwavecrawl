import initCrawlState from '../../../init.ts'
import getHelm from './get.ts'

describe('getHelm', () => {
  let originalActors: Map<string, Actor>
  const anne = 'anne-bonny'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    game.actors.set(anne, { id: anne } as Actor)
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('returns null if the team has no helm defined', () => {
    const state = initCrawlState()
    expect(getHelm('starboard', state)).toBeNull()
  })

  it('returns null if there is no such actor', () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: 'dread-pirate-roberts', onDuty: true }
    expect(getHelm('starboard', state)).toBeNull()
  })

  it('returns the team’s designated helmsman', () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: anne, onDuty: true }
    expect(getHelm('starboard', state)?.id).toBe(anne)
  })
})
