import getSolarAngle from './get-solar-angle.ts'

describe('getSolarAngle', () => {
  it.each([
    [-15.91, '4 October 2025, 12:00 AM'],
    [-58.27, '4 October 2025, 3:00 AM'],
    [-70.98, '4 October 2025, 6:00 AM'],
    [-30.20, '4 October 2025, 9:00 AM'],
    [12.56, '4 October 2025, 12:00 PM'],
    [52.56, '4 October 2025, 3:00 PM'],
    [62.73, '4 October 2025, 6:00 PM'],
    [26.52, '4 October 2025, 9:00 PM']
  ] as [number, string][])(`returns %d for %s`, (expected, str) => {
    expect(getSolarAngle(new Date(str + ' UTC'))).toBeCloseTo(expected)
  })
})
