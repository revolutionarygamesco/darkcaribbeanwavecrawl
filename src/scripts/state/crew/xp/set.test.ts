import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack } from '../../../utilities/testing/crew.ts'
import setXP from './set.ts'

describe('setXP', () => {
  setupCrew()

  let state: CrawlState
  const val = 1000

  beforeEach(() => {
    state = setupState()
  })

  it.each(['quartermaster', 'captain'])('sets Jack’s experience as %s (as ID)', async (position) => {
    const actual = await setXP(jack, position, val, state)
    expect(actual.crew.xp[jack][position]).toBe(val)
  })

  it.each(['quartermaster', 'captain'])('sets Jack’s experience as %s (as Actor)', async (position) => {
    const actual = await setXP({ id: jack } as Actor, position, val, state)
    expect(actual.crew.xp[jack][position]).toBe(val)
  })
})
