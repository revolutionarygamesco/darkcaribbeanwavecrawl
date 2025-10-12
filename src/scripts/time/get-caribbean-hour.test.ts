import getCaribbeanHour from './get-caribbean-hour.ts'

describe('getCaribbeanHour', () => {
  it('returns the hour in GMT-5', () => {
    expect(getCaribbeanHour(new Date(-8029350000000))).toBe(12)
  })
})
