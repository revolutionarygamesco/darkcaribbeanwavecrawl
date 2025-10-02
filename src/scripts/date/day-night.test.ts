import calculateDayNight from './day-night'

describe('calculateDayNight', () => {
  it.each([
    ['dawn', '24 July 1715, 6:00 AM'],
    ['day', '24 July 1715, 3:00 PM'],
    ['dusk', '24 July 1715, 6:30 PM'],
    ['night', '24 July 1715, 11:00 PM']
  ])(`returns %s for %s`, (expected, dateStr) => {
    expect(calculateDayNight(new Date(dateStr))).toBe(expected)
  })
})
