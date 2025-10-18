import type CrawlState from '../state/state.ts'
import initCrawlState from '../state/init.ts'
import getCrewShares from './get-crew-shares.ts'

describe('getCrewShares', () => {
  let state: CrawlState
  let originalActors: Map<string, Actor>
  const jack = 'calico-jack'
  const anne = 'anne-bonny'
  const mary = 'mary-read'

  beforeAll(() => {
    originalActors = game.actors
  })

  beforeEach(() => {
    game.actors = new Map<string, Actor>()
    for (const id of [jack, anne, mary]) game.actors.set(id, { id } as Actor)

    state = initCrawlState()
    state.crew.positions.captain = { shares: 2, assigned: [jack] }
    state.crew.positions.quartermaster = { shares: 1.5, assigned: [anne] }
    state.crew.positions.gunner = { shares: 1.25, assigned: [anne, mary] }
  })

  afterEach(() => {
    game.actors = originalActors
  })

  it('returns a table of crew members and shares for each', async () => {
    const { accounts, total } = await getCrewShares(state)
    expect(Object.keys(accounts)).toHaveLength(3)
    expect(accounts[jack].shares).toBe(2)
    expect(accounts[anne].shares).toBe(1.5)
    expect(accounts[mary].shares).toBe(1.25)
    expect(total).toBe(2 + 1.5 + 1.25)
  })
})
