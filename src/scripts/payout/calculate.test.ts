import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../utilities/testing/crew.ts'
import calculatePayout from './calculate.ts'

describe('calculatePayout', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
    state.silver.company = 20
  })

  /**
   * Common stock before payout = 20
   * Total shares = 2 + 1.5 + 1 = 4.5
   * Per share = 16 / 5 = 3.555, rounded down to 3
   * Jack gets 3 * 2 = 6
   * Anne gets 3 * 1.5 = 4.5, rounded down to 4
   * Mary gets 3 * 1 = 3
   * Total paid out is 6 + 4 + 3 = 13
   * Remaining in common stock is 20 - 13 = 7
   */

  it('calculates the payout', async () => {
    const { accounts, total, remaining } = await calculatePayout(16, state)
    expect(Object.keys(accounts)).toHaveLength(3)
    expect(accounts[jack].amount).toBe(6)
    expect(accounts[anne].amount).toBe(4)
    expect(accounts[mary].amount).toBe(3)
    expect(total).toBe(13)
    expect(remaining).toBe(7)
  })
})
