import { MODULE_ID } from '../settings.ts'
import getDayNight from './get-day-night.ts'

describe('getDayNight', () => {
  it.each([
    [`${MODULE_ID}.time.dawn`, '24 July 1715, 6:00 AM'],
    [`${MODULE_ID}.time.day`, '24 July 1715, 3:00 PM'],
    [`${MODULE_ID}.time.dusk`, '24 July 1715, 6:30 PM'],
    [`${MODULE_ID}.time.night`, '24 July 1715, 11:00 PM']
  ])(`returns %s for %s`, (expected, dateStr) => {
    expect(getDayNight(new Date(dateStr + ' GMT-0500'))).toBe(expected)
  })
})
