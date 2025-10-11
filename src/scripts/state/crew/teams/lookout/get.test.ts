import initCrawlState from '../../../init.ts'
import getLookout from './get.ts'

describe('getLookout', () => {
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

  it('returns null if the team has no lookout defined', () => {
    const state = initCrawlState()
    expect(getLookout('starboard', state)).toBeNull()
  })

  it('returns null if there is no such actor', () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', crew: [anne], lookout: 'pew' }
    expect(getLookout('starboard', state)).toBeNull()
  })

  it('returns the team’s designated lookout', () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', crew: [anne], lookout: anne }
    expect(getLookout('starboard', state)?.id).toBe(anne)
  })
})
