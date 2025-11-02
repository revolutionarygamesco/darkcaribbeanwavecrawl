import calculateTime from './time.ts'

describe('calculateTime', () => {
  it.each([
    [1304, 2],
    [869, 3],
    [652, 4],
    [522, 5],
    [435, 6],
    [373, 7],
    [326, 8],
    [290, 9],
    [261, 10],
    [237, 11],
    [218, 12],
    [201, 13],
    [187, 14],
    [174, 15],
    [44, 60]
  ] as [number, number][])('reports that you can travel 50 nautical miles in %d minutes at %d knots', async (expected, speed) => {
    expect(await calculateTime(speed)).toBe(expected)
  })
})
