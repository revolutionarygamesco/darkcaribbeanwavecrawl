import ringBell from './ring.ts'

describe('ringBell', () => {
  it.each([
    [false, 'not the top or bottom', new Date('24 July 1715, 6:17 PM')],
    [true, 'top', new Date('24 July 1715, 6:00 PM')],
    [true, 'bottom', new Date('24 July 1715, 6:30 PM')]
  ] as [boolean, string, Date][])(`returns %s if %s of the hour`, (expected, _, time) => {
    expect(ringBell(time)).toBe(expected)
  })
})
