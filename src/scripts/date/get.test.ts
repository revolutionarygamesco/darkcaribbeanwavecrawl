import getDate from './get.ts'

describe('getDate', () => {
  it.each([
    ['24 July 1715, 3:30 PM', 30, '24 July 1715, 3:00 PM'],
    ['25 July 1715, 3:00 PM', 24 * 60, '24 July 1715, 3:00 PM'],
    ['3 August 1715, 3:00 PM', 24 * 60 * 10, '24 July 1715, 3:00 PM']
  ] as [string, number, string][])('returns %s for the date %d minutes after %s', (expected, minutes, start) => {
    expect(getDate(new Date(start), minutes)).toEqual(new Date(expected))
  })
})