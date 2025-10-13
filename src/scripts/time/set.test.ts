import setTime, { SetTimeOptions } from './set.ts'

describe('setTime', () => {
  const original = new Date(Date.UTC(2025, 9, 12, 5, 48, 0, 0))

  const getExpectedChange = (options: Partial<SetTimeOptions>): Date => {
    const year = options.year === undefined ? original.getUTCFullYear() : options.year
    const month = options.month === undefined ? original.getUTCMonth() : options.month
    const date = options.date === undefined ? original.getUTCDate() : options.date
    const hour = options.hour === undefined ? original.getUTCHours() : options.hour
    const minute = options.minute === undefined ? original.getUTCMinutes() : options.minute
    return new Date(Date.UTC(year, month, date, hour, minute, 0, 0))
  }

  it.each([
    ['the year', { year: 1722 }],
    ['the month', { month: 0 }],
    ['the date', { date: 1 }],
    ['the hour', { hour: 0 }],
    ['the minute', { minute: 0 }],
    ['everything at once', { year: 1722, month: 0, date: 1, hour: 0, minute: 0 }]
  ] as [string, Partial<SetTimeOptions>][])('can change %s', async (_, options) => {
    const actual = await setTime(options, original, false)
    const expected = getExpectedChange(options)
    expect(actual).toEqual(expected)
  })
})
