import type CrawlState from '../state/state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../utilities/testing/crew.ts'
import getCrewShares from './get-crew-shares.ts'

describe('getCrewShares', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('returns a table of crew members and shares for each', async () => {
    const { accounts, total } = await getCrewShares(state)
    expect(Object.keys(accounts)).toHaveLength(3)
    expect(accounts[jack].shares).toBe(2)
    expect(accounts[anne].shares).toBe(1.5)
    expect(accounts[mary].shares).toBe(1)
    expect(total).toBe(2 + 1.5 + 1)
  })
})
