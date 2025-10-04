import adjustDate from './adjust-date.ts'

describe('adjustDate', () => {
  it.each([
    ['25 July 1715', 1, '24 July 1715'],
    ['29 July 1715', 5, '24 July 1715'],
    ['23 July 1715', -1, '24 July 1715'],
    ['19 July 1715', -5, '24 July 1715']
  ] as [string, number, string][])(
    `returns %s when adjusting %d days from %s`,
    (expected, days, start) => {
      const specimen = new Date(start)
      adjustDate(specimen, days)
      expect(specimen).toEqual(new Date(expected))
    }
  )
})
