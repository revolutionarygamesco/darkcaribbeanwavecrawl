import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import updateCrewSilver from './update.ts'

describe('updateCrewSilver', () => {
  setupCrew()
  let before: CrawlState

  beforeEach(() => {
    before = setupState()
  })

  it.each([
    [50, 'Calico Jack', jack],
    [50, 'Anne Bonny', anne],
    [50, 'Mary Read', mary]
  ] as [number, string, string][])('finds %d silver for %s', async (expected, _, id) => {
    const actual = await updateCrewSilver(before, false)
    expect(actual.silver.crew[id]).toBe(expected)
  })
})
