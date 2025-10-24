import { setupState, jack } from '../../../../utilities/testing/crew.ts'
import getCopy from '../../../get-copy.ts'
import checkExclusivity from './exclusive.ts'

describe('checkExclusivity', () => {
  it('accepts states that respect all position exclusivity', async () => {
    const state = setupState()
    const actual = await checkExclusivity(state)
    expect(actual).toBe(true)
  })

  it('rejects states that don’t respect position exclusivity', async () => {
    const state = await getCopy(setupState())
    state.crew.positions.quartermaster = [jack]
    const actual = await checkExclusivity(state)
    expect(actual).toBe(false)
  })
})
