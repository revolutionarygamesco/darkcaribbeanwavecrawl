import rank from './rank.ts'

describe('rank', () => {
  it.each([
    [0, 'novice'],
    [500, 'novice'],
    [999, 'novice'],
    [1000, 'able'],
    [1500, 'able'],
    [2000, 'able'],
    [2500, 'able'],
    [3000, 'able'],
    [3500, 'able'],
    [4000, 'able'],
    [4500, 'able'],
    [4900, 'able'],
    [5000, 'seasoned'],
    [5500, 'seasoned'],
    [6000, 'seasoned'],
    [6500, 'seasoned'],
    [7000, 'seasoned'],
    [7500, 'seasoned'],
    [8000, 'seasoned'],
    [8500, 'seasoned'],
    [9000, 'seasoned'],
    [9500, 'seasoned'],
    [9999, 'seasoned'],
    [10000, 'veteran'],
    [100000, 'veteran']
  ] as [number, string][])('ranks %d hours as %s',  (hours, expected) => {
    expect(rank(hours)).toBe(expected)
  })
})
