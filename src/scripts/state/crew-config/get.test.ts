import getCrewConfig from './get.ts'

describe('getCrewConfig', () => {
  it('returns crew configuration', () => {
    const config = getCrewConfig()
    expect(config.captain?.shares).toBe(2)
  })
})
