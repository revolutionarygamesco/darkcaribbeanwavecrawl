import setTime from './set.ts'

describe('setTime', () => {
  const original = new Date('2025-10-12T05:48:00.000-05:00')

  it('can change the year', async () => {
    const actual = await setTime({ year: 1715 }, original, false)
    const expected = new Date('1715-10-12T05:48:00.000-05:00')
    expect(actual).toEqual(expected)
  })

  it('can change the month', async () => {
    const actual = await setTime({ month: 7 }, original, false)
    const expected = new Date('2025-07-12T05:48:00.000-05:00')
    expect(actual).toEqual(expected)
  })

  it('can change the day', async () => {
    const actual = await setTime({ date: 24 }, original, false)
    const expected = new Date('2025-10-24T05:48:00.000-05:00')
    expect(actual).toEqual(expected)
  })

  it('can change the hour', async () => {
    const actual = await setTime({ hour: 12 }, original, false)
    const expected = new Date('2025-10-12T12:48:00.000-05:00')
    expect(actual).toEqual(expected)
  })

  it('can change the minute', async () => {
    const actual = await setTime({ minute: 0 }, original, false)
    const expected = new Date('2025-10-12T05:00:00.000-05:00')
    expect(actual).toEqual(expected)
  })

  it('can change the whole thing at once', async () => {
    const actual = await setTime({ year: 1715, month: 7, date: 24, hour: 12, minute: 0 }, original, false)
    const expected = new Date('1715-07-24T12:00:00.000-05:00')
    expect(actual).toEqual(expected)
  })
})
