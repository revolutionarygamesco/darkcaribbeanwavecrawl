import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import setupCrew, { jack, mary, anne } from '../../../utilities/testing/crew.ts'
import assign from './assign.ts'

describe('assign', () => {
  setupCrew()

  let before: CrawlState

  beforeEach(() => {
    before = initCrawlState()
    before.ship.actor = 'william'
  })

  it('assigns a character to a position in a new state', async () => {
    const after = await assign('captain', jack, before, false)
    const assigned = after.crew.positions.captain
    expect(assigned).toEqual([jack])
    expect(after).not.toBe(before)
  })

  it('assigns multiple characters to a position in a new state', async () => {
    const after = await assign('gunner', [anne, mary], before, false)
    const assigned = after.crew.positions.gunner
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('assigns additional characters to a position in a new state', async () => {
    const mid = await assign('gunner', anne, before, false)
    const after = await assign('gunner', mary, mid, false)
    const assigned= after.crew.positions.gunner
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })

  it('removes duplicates', async () => {
    const mid = await assign('gunner', anne, before, false)
    const after = await assign('gunner', [anne, mary], mid, false)
    const assigned = after.crew.positions.gunner
    expect(assigned).toEqual([anne, mary])
    expect(after).not.toBe(before)
  })
})
