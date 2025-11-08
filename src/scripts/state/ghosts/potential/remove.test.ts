import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import removePotentialGhost from './remove.ts'

describe('removePotentialGhost', () => {
  let state: CrawlState
  let id: string

  beforeEach(() => {
    state = initCrawlState()

    const ghost = completeGhost()
    state.ghosts.potential = [ghost]
    id = ghost.id
  })

  it('removes a potential ghost from the state', async () => {
    const { ghosts } = await removePotentialGhost(id, state, false)
    expect(ghosts.potential).toEqual([])
  })

  it('can remove several potential ghosts from the state', async () => {
    const ghost = completeGhost()
    state.ghosts.potential.push(ghost)
    const { ghosts } = await removePotentialGhost([id, ghost.id], state, false)
    expect(ghosts.potential).toEqual([])
  })

  it('retains other potential ghosts', async () => {
    const ghost = completeGhost()
    state.ghosts.potential.push(ghost)
    const { ghosts } = await removePotentialGhost(id, state, false)
    const ids = ghosts.potential.map(ghost => ghost.id)
    expect(ids).toEqual([ghost.id])
  })
})
