import type CrawlState from '../../state.ts'
import { setupState, anne, mary } from '../../../utilities/testing/crew.ts'
import getRosterCount from './count.ts'

describe('getRosterCount', () => {
  let before: CrawlState

  beforeEach(() => {
    before = setupState()
  })

  it('counts character on the crew', async () => {
    const actual = await getRosterCount(before)
    expect(actual).toBe(3)
  })

  it('doesn’t count people in multiple positions multiple times', async () => {
    before.crew.positions.quartermaster = [anne]
    before.crew.positions.master = [mary]
    const actual = await getRosterCount(before)
    expect(actual).toBe(3)
  })
})
