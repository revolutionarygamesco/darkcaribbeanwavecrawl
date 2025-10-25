import type CrawlState from '../../state.ts'
import { setupState, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import getRosterIds from './ids.ts'

describe('getRosterIds', () => {
  let before: CrawlState
  const crew = [jack, anne, mary]

  beforeEach(() => {
    before = setupState()
  })

  it('returns a roster of every character on the crew', async () => {
    const actual = await getRosterIds(before)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(actual).toContain(id)
  })

  it('removes duplicates from multiple positions', async () => {
    before.crew.positions.quartermaster = [anne]
    before.crew.positions.master = [mary]
    const actual = await getRosterIds(before)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(actual).toContain(id)
  })
})
