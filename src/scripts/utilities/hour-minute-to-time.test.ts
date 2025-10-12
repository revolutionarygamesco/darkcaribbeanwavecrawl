import hourMinuteToTime from './hour-minute-to-time.ts'

describe('hourMinuteToTime', () => {
  it.each([
    [0, 0, 0],
    [30, 0, 30],
    [217, 2, 17],
    [1417, 14, 17],
    [1630, 16, 30]
  ] as [number, number, number][])('returns %d  for hour %d, minute %d', (expected, h, m) => {
    expect(hourMinuteToTime(h, m)).toBe(expected)
  })
})
