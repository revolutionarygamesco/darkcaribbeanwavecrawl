import CrawlState, { Ghost } from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import realizePotentialGhost from './realize.ts'

describe('realizePotentialGhost', () => {
  let state: CrawlState
  let ghost: Ghost

  beforeEach(() => {
    state = initCrawlState()

    ghost = completeGhost()
    state.ghosts.potential = [ghost]
  })

  it('moves a potential ghost to the haunting list', async () => {
    const { ghosts } = await realizePotentialGhost(ghost, state, false)
    expect(ghosts.potential).toEqual([])
    expect(ghosts.haunting).toEqual([ghost])
  })

  it('can move several potential ghosts to the haunting list at once', async () => {
    const other = completeGhost()
    state.ghosts.potential.push(other)
    const { ghosts } = await realizePotentialGhost([ghost, other], state, false)
    expect(ghosts.potential).toEqual([])
    expect(ghosts.haunting).toEqual([ghost, other])
  })
})
