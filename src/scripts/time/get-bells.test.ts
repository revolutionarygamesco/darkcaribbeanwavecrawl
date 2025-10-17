import { formatTime } from './get-watch.test.ts'
import getBells from './get-bells.ts'

describe('getBells', () => {
  it.each([
    [8, formatTime(4, 0), 4, 0],
    [0, formatTime(4, 1), 4, 1],
    [0, formatTime(4, 29), 4, 29],
    [1, formatTime(4, 30), 4, 30],
    [1, formatTime(4, 45), 4, 45],
    [2, formatTime(5, 0), 5, 0],
    [2, formatTime(5, 10), 5, 10],
    [3, formatTime(5, 30), 5, 30],
    [3, formatTime(5, 50), 5, 50],
    [4, formatTime(6, 0), 6, 0],
    [4, formatTime(6, 12), 6, 12],
    [5, formatTime(6, 30), 6, 30],
    [5, formatTime(6, 55), 6, 55],
    [6, formatTime(7, 0), 7, 0],
    [6, formatTime(7, 4), 7, 4],
    [7, formatTime(7, 30), 7, 30],
    [7, formatTime(7, 48), 7, 48],
    [8, formatTime(8, 0), 8, 0],
    [0, formatTime(8, 1), 8, 1],
    [3, formatTime(17, 30), 17, 30],
    [8, formatTime(18, 0), 18, 0],
    [3, formatTime(19, 30), 19, 30],
    [8, formatTime(20, 0), 20, 0]
  ] as [number, string, number, number][])('returns %d bells at %s', (expected, _, h, m) => {
    expect(getBells(h, m)).toBe(expected)
  })
})
