import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack } from '../../../utilities/testing/crew.ts'
import getXP from './get.ts'

describe('getXP', () => {
  setupCrew()

  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it.each(['quartermaster', 'captain'])('returns Jack’s experience as %s (as ID)', async (position) => {
    const actual = await getXP(jack, position, state)
    expect(actual).toBe(state.crew.xp[jack][position] ?? 0)
  })

  it.each(['quartermaster', 'captain'])('returns Jack’s experience as %s (as Actor)', async (position) => {
    const actual = await getXP({ id: jack } as Actor, position, state)
    expect(actual).toBe(state.crew.xp[jack][position] ?? 0)
  })
})
