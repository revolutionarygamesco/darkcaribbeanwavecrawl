import CrawlState, { Ghost, GhostPatch } from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import updateGhost from './update.ts'

describe('updateGhost', () => {
  let state: CrawlState
  let ghost: Ghost

  beforeEach(() => {
    state = initCrawlState()

    ghost = completeGhost()
    state.ghosts.haunting = [ghost]
  })

  it('updates a ghost in a new state', async () => {
    const update: GhostPatch = { names: { haunted: 'Updated Ghost' } }
    const { ghosts } = await updateGhost(ghost.id, update, state, false)
    expect(ghosts.haunting[0].names.haunted).toBe('Updated Ghost')
  })
})
