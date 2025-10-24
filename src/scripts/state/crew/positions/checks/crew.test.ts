import setupCrew, { setupState, extras } from '../../../../utilities/testing/crew.ts'
import getCopy from '../../../get-copy.ts'
import checkCrew from './crew.ts'

describe('checkCrew', () => {
  setupCrew(true)

  it('accepts states with crew smaller than ship crew capacity', async () => {
    const state = setupState()
    const actual = await checkCrew(state)
    expect(actual).toBe(true)
  })

  it('rejects states with crew larger than ship crew capacity', async () => {
    const state = await getCopy(setupState())
    state.crew.positions.crew = extras
    const actual = await checkCrew(state)
    expect(actual).toBe(false)
  })
})
