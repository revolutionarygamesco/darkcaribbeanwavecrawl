import type CrawlState from '../state.ts'
import setupCrew, { setupState, jack, anne, mary } from '../../utilities/testing/crew.ts'
import getRoster from './get.ts'

describe('getRoster', () => {
  setupCrew()

  let before: CrawlState
  const crew = [jack, anne, mary]

  beforeEach(() => {
    before = setupState()
  })

  it('returns a roster of every character on the members', async () => {
    const actual = await getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })

  it('removes duplicates from multiple positions', async () => {
    before.crew.positions.quartermaster = { shares: 1, assigned: [anne] }
    before.crew.positions['sailing-master'] = { shares: 1, assigned: [mary] }
    const actual = await getRoster(before)
    const ids = actual.map(actor => actor.id)
    expect(actual).toHaveLength(3)
    for (const id of crew) expect(ids).toContain(id)
  })
})
