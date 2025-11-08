import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import addPotentialGhost from './add.ts'

describe('addPotentialGhost', () => {
  let state: CrawlState

  beforeEach(() => {
    state = initCrawlState()
  })

  it('adds a new potential ghost to the state', async () => {
    const ghost = completeGhost()
    const actual = await addPotentialGhost(ghost, state, false)
    expect(actual.ghosts.potential).toEqual([ghost])
  })

  it('can add several new potential ghosts to the state', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    const actual = await addPotentialGhost([g1, g2], state, false)
    expect(actual.ghosts.potential).toEqual([g1, g2])
  })

  it('retains previous potential ghosts', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    state.ghosts.potential = [g1]
    const actual = await addPotentialGhost(g2, state, false)
    expect(actual.ghosts.potential).toEqual([g1, g2])
  })
})
