import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack } from '../../../utilities/testing/crew.ts'
import getAssigned from './get.ts'

describe('getAssigned', () => {
  setupCrew()

  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('gets the characters assigned to a position from the state', async () => {
    const captains = await getAssigned('captain', state)
    expect(captains).toHaveLength(1)
    expect(captains[0].id).toBe(jack)
  })
})
