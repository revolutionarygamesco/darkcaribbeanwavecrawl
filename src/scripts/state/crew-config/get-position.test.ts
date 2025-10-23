import { DEFAULT_CREW } from '../../settings.ts'
import getPositionConfig from './get-position.ts'

describe('getPositionConfig', () => {
  it('gets configuration for a given position', () => {
    expect(getPositionConfig('captain')).toEqual(DEFAULT_CREW.captain)
  })

  it('returns null if given an invalid key', () => {
    expect(getPositionConfig('coder')).toBeNull()
  })
})
