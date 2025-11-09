import completeGhost from './complete.ts'
import patchGhost from './patch.ts'

describe('patchGhost', () => {
  it('patches a ghost', () => {
    const original = completeGhost()
    const patch = { names: { haunted: 'Patched Ghost' } }
    const actual = patchGhost(original, patch)

    const expected = JSON.parse(JSON.stringify(original))
    expected.names.haunted = 'Patched Ghost'
    expect(actual).toEqual(expected)
  })
})
