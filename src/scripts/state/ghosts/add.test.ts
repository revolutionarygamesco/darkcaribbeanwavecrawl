import type CrawlState from '../state.ts'
import initCrawlState from '../init.ts'
import completeGhost from './complete.ts'
import addGhost from './add.ts'

describe('addGhost', () => {
  let state: CrawlState

  beforeEach(() => {
    state = initCrawlState()
  })

  it('adds a new ghost to the state', async () => {
    const ghost = completeGhost()
    const actual = await addGhost(ghost, state, false)
    expect(actual.ghosts).toEqual([ghost])
  })

  it('can add several new ghosts to the state', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    const actual = await addGhost([g1, g2], state, false)
    expect(actual.ghosts).toEqual([g1, g2])
  })

  it('retains previous ghosts', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    state.ghosts = [g1]
    const actual = await addGhost(g2, state, false)
    expect(actual.ghosts).toEqual([g1, g2])
  })
})
