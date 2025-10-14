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

  it('returns null if the team has no helm defined', async () => {
    const state = initCrawlState()
    expect(await getHelm('starboard', state)).toBeNull()
  })

  it('returns null if there is no such actor', async () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: 'dread-pirate-roberts', onDuty: true }
    expect(await getHelm('starboard', state)).toBeNull()
  })

  it('returns the team’s designated helmsman', async () => {
    const state = initCrawlState()
    state.crew.teams.starboard = { officer: 'quartermaster', members: [anne], helm: anne, onDuty: true }
    expect((await getHelm('starboard', state))?.id).toBe(anne)
  })
})
