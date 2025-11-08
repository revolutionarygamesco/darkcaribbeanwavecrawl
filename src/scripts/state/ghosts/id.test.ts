import completeGhost from './complete.ts'
import getGhostID from './id.ts'

describe('getGhostID', () => {
  it('returns ID from a ghost', () => {
    const ghost = completeGhost()
    expect(getGhostID(ghost)).toBe(ghost.id)
  })

  it('returns empty string from a partial without an ID', () => {
    expect(getGhostID({})).toBe('')
  })

  it('returns the string if given a string', () => {
    const { id } = completeGhost()
    expect(getGhostID(id)).toBe(id)
  })
})
