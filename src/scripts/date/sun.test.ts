import calculateSunAngle from './sun'

describe('calculateSunAngle', () => {
  it.each([
    [ -52.68, '24 July 1715, 12:00 AM'],
    [-32.17, '24 July 1715, 3:00 AM'],
    [5.85, '24 July 1715, 6:00 AM'],
    [47.42, '24 July 1715, 9:00 AM'],
    [87.68, '24 July 1715, 12:00 PM'],
    [47.42, '24 July 1715, 3:00 PM'],
    [5.85, '24 July 1715, 6:00 PM'],
    [-32.17, '24 July 1715, 9:00 PM']
  ] as [number, string][])(`returns %d for %s`, (expected, str) => {
    expect(calculateSunAngle(new Date(str + ' GMT-0500'))).toBeCloseTo(expected)
  })
})
