import CrawlState, { Ghost, GhostPatch } from '../../state.ts'
import initCrawlState from '../../init.ts'
import completeGhost from '../complete.ts'
import updatePotentialGhost from './update.ts'

describe('updatePotentialGhost', () => {
  let state: CrawlState
  let ghost: Ghost

  beforeEach(() => {
    state = initCrawlState()

    ghost = completeGhost()
    state.ghosts.potential = [ghost]
  })

  it('updates a potential ghost in a new state', async () => {
    const update: GhostPatch = { names: { haunted: 'Updated Ghost' } }
    const { ghosts } = await updatePotentialGhost(ghost.id, update, state, false)
    expect(ghosts.potential[0].names.haunted).toBe('Updated Ghost')
  })
})
