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
   * Total shares = 2 + 2 + 1 = 5
   * Per share = 16 / 5 = 3.2, rounded down to 3
   * Jack gets 3 * 2 = 6
   * Anne gets 3 * 2 = 6
   * Mary gets 3 * 1 = 3
   * Total paid out is 6 + 6 + 3 = 15
   * Remaining in common stock is 20 - 15 = 5
   */

  it('calculates the payout', async () => {
    const { accounts, total, remaining } = await calculatePayout(16, state)
    expect(Object.keys(accounts)).toHaveLength(3)
    expect(accounts[jack].amount).toBe(6)
    expect(accounts[anne].amount).toBe(6)
    expect(accounts[mary].amount).toBe(3)
    expect(total).toBe(15)
    expect(remaining).toBe(5)
  })
})
