import type CrawlState from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import removeGhost from './remove.ts'

describe('removeGhost', () => {
  let state: CrawlState
  let id: string

  beforeEach(() => {
    state = initCrawlState()

    const ghost = completeGhost()
    state.ghosts.haunting = [ghost]
    id = ghost.id
  })

  it('removes a ghost from the state', async () => {
    const { ghosts } = await removeGhost(id, state, false)
    expect(ghosts.haunting).toEqual([])
  })

  it('can remove several ghosts from the state', async () => {
    const ghost = completeGhost()
    state.ghosts.haunting.push(ghost)
    const { ghosts } = await removeGhost([id, ghost.id], state, false)
    expect(ghosts.haunting).toEqual([])
  })

  it('retains other ghosts', async () => {
    const ghost = completeGhost()
    state.ghosts.haunting.push(ghost)
    const { ghosts } = await removeGhost(id, state, false)
    const ids = ghosts.haunting.map(ghost => ghost.id)
    expect(ids).toEqual([ghost.id])
  })
})
