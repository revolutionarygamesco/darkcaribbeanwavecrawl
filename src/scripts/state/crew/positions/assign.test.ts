import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import setupCrew, { jack } from '../../../utilities/testing/crew.ts'
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
    const assigned = after?.crew.positions.captain
    expect(assigned).toEqual([jack])
    expect(after).not.toBe(before)
  })
})
