import type CrawlState from '../../state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../../../utilities/testing/crew.ts'
import getRosterActors from './actors.ts'

describe('getRosterActors', () => {
  setupCrew()

  let before: CrawlState
  const crew = [jack, anne, mary]

  beforeEach(() => {
    before = setupState()
  })

  it('returns a roster of every character on the members', async () => {
    const actual = await getRosterActors(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })

  it('removes duplicates from multiple positions', async () => {
    before.crew.positions.quartermaster = [anne]
    before.crew.positions.master = [mary]
    const actual = await getRosterActors(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })
})
