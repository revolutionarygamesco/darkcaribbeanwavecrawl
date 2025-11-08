import completeGhost from './complete.ts'
import getGhostIDs from './ids.ts'

describe('getGhostIDs', () => {
  it('returns an array of ghosts or IDs as an array of IDs', () => {
    const g1 = completeGhost()
    const g2 = completeGhost()
    expect(getGhostIDs([g1, g2.id, {}])).toEqual([g1.id, g2.id, ''])
  })
})
