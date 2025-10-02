import calculateSunAngle from './sun'

describe('calculateSunAngle', () => {
  it.each([
    [ -52.67, '24 July 1715, 12:00 AM'],
    [-32.92, '24 July 1715, 3:00 AM'],
    [4.95, '24 July 1715, 6:00 AM'],
    [46.49, '24 July 1715, 9:00 AM'],
    [87.49, '24 July 1715, 12:00 PM'],
    [48.36, '24 July 1715, 3:00 PM'],
    [6.75, '24 July 1715, 6:00 PM'],
    [-31.42, '24 July 1715, 9:00 PM']
  ] as [number, string][])(`returns %d for %s`, (expected, str) => {
    expect(calculateSunAngle(new Date(str))).toBeCloseTo(expected)
  })
})
