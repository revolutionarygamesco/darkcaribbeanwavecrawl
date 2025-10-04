import countDinners from './dinners.ts'

describe('countDinners', () => {
  it.each([
    [0, '24 July 1715, 3:00 PM', '24 July 1715, 4:00 PM'],
    [1, '24 July 1715, 3:00 PM', '24 July 1715, 6:30 PM'],
    [10, '24 July 1715, 3:00 PM', '2 August 1715, 8:00 PM'],
    [-1, '24 July 1715, 3:00 PM', '23 July 1715, 3:00 PM'],
    [-10, '24 July 1715, 3:00 PM', '14 July 1715, 3:00 PM']
  ] as [number, string, string][])(`counts %d dinner times between %s and %s`, (expected, start, end) => {
    expect(countDinners(new Date(start), new Date(end))).toBe(expected)
  })
})
