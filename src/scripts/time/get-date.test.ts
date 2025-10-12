import getDate from './get-date.ts'

describe('getDate', () => {
  it('returns the date', () => {
    const input = new Date(Date.UTC(2025, 9, 12, 18, 9))
    const s = Math.floor(input.getTime() / 1000)
    const date = getDate(s)
    expect(date.getUTCFullYear()).toBe(2025)
    expect(date.getUTCMonth()).toBe(9)
    expect(date.getUTCDate()).toBe(12)
    expect(date.getUTCHours()).toBe(18)
    expect(date.getUTCMinutes()).toBe(9)
  })
})
