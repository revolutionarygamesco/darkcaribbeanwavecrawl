import getPreviousMidnight from './get-previous-midnight.ts'

describe('getPreviousMidnight', () => {
  it('returns the last midnight before a date', () => {
    const date = new Date(Date.UTC(1715, 6, 15, 7, 30))
    const actual = getPreviousMidnight(date)
    expect(actual.getUTCFullYear()).toBe(date.getUTCFullYear())
    expect(actual.getUTCMonth()).toBe(date.getUTCMonth())
    expect(actual.getUTCDate()).toBe(date.getUTCDate())
    expect(actual.getUTCHours()).toBe(0)
    expect(actual.getUTCMinutes()).toBe(0)
    expect(actual.getUTCSeconds()).toBe(0)
    expect(actual.getUTCMilliseconds()).toBe(0)
  })
})
