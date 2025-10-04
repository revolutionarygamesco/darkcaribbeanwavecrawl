import { MODULE_ID } from '../settings.ts'
import calculateDayNight from './day-night'

describe('calculateDayNight', () => {
  it.each([
    [`${MODULE_ID}.time.dawn`, '24 July 1715, 6:00 AM'],
    [`${MODULE_ID}.time.day`, '24 July 1715, 3:00 PM'],
    [`${MODULE_ID}.time.dusk`, '24 July 1715, 6:30 PM'],
    [`${MODULE_ID}.time.night`, '24 July 1715, 11:00 PM']
  ])(`returns %s for %s`, (expected, dateStr) => {
    expect(calculateDayNight(new Date(dateStr))).toBe(expected)
  })
})
