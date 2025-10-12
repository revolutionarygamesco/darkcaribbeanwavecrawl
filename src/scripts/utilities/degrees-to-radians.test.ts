import degreesToRadians from './degrees-to-radians.ts'

describe('degreesToRadians', () => {
  it.each([
    [0, 0],
    [90, 1.57],
    [180, 3.14],
    [270, 4.71],
    [360, 6.28]
  ] as [number, number][])('converts %d° to %d radians', (degrees, radians) => {
    expect(degreesToRadians(degrees)).toBeCloseTo(radians)
  })
})
