import { DEFAULT_CREW } from '../../settings.ts'
import setCrewConfig from './set.ts'

describe('setCrewConfig', () => {
  it('returns crew config', async () => {
    const actual = await setCrewConfig(DEFAULT_CREW)
    expect(actual.captain?.shares).toBe(2)
  })
})
