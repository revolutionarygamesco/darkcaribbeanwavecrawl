import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import addGhost from './add.ts'

describe('addGhost', () => {
  let state: CrawlState

  beforeEach(() => {
    state = initCrawlState()
  })

  it('adds a new ghost to the state', async () => {
    const ghost = completeGhost()
    const { ghosts } = await addGhost(ghost, state, false)
    expect(ghosts.haunting).toEqual([ghost])
  })

  it('can add several new ghosts to the state', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    const { ghosts } = await addGhost([g1, g2], state, false)
    expect(ghosts.haunting).toEqual([g1, g2])
  })

  it('retains previous ghosts', async () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    state.ghosts.haunting = [g1]
    const { ghosts } = await addGhost(g2, state, false)
    expect(ghosts.haunting).toEqual([g1, g2])
  })
})
