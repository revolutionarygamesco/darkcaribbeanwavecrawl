import type CrawlState from '../state/state.ts'
import initCrawlState from '../state/init.ts'
import calculatePayout from './calculate.ts'

describe('calculatePayout', () => {
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
    state.silver.company = 20
    state.crew.positions.captain = { shares: 2, assigned: [jack] }
    state.crew.positions.quartermaster = { shares: 1.5, assigned: [anne] }
    state.crew.positions.gunner = { shares: 1.25, assigned: [anne, mary] }
  })

  afterEach(() => {
    game.actors = originalActors
  })

  /**
   * Common stock before payout = 20
   * Total shares = 2 + 1.5 + 1.25 = 4.25
   * Per share = 15 / 4.75 = 3.16, rounded down to 3
   * Jack gets 3 * 2 = 6
   * Anne gets 3 * 1.5 = 4.5, rounded down to 4
   * Mary gets 3 * 1.25 = 3.75, rounded down to 3
   * Total paid out is 6 + 4 + 3 = 13
   * Remaining in common stock is 20 - 13 = 7
   */

  it('calculates the payout', async () => {
    const { accounts, total, remaining } = await calculatePayout(15, state)
    expect(Object.keys(accounts)).toHaveLength(3)
    expect(accounts[jack].amount).toBe(6)
    expect(accounts[anne].amount).toBe(4)
    expect(accounts[mary].amount).toBe(3)
    expect(total).toBe(13)
    expect(remaining).toBe(7)
  })
})
