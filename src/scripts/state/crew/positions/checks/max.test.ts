import { setupState, jack, anne } from '../../../../utilities/testing/crew.ts'
import getCopy from '../../../get-copy.ts'
import checkMax from './max.ts'

describe('checkMax', () => {
  it('accepts states that respect all position max settings', async () => {
    const state = setupState()
    const actual = await checkMax(state)
    expect(actual).toBe(true)
  })

  it('rejects states that don’t respect position max settings', async () => {
    const state = await getCopy(setupState())
    state.crew.positions.captain = [jack, anne]
    const actual = await checkMax(state)
    expect(actual).toBe(false)
  })
})
