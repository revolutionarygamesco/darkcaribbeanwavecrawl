import describeHaunt from './describe.ts'

describe('describeHaunt', () => {
  it.each([
    [-1, 'Normal'],
    [0, 'Normal'],
    [1, 'Normal'],
    [2, 'Bloody'],
    [3, 'Dark'],
    [4, 'Dark'],
    [10, 'Dark']
  ]as [number, string][])('describes %d as %s', (value, expected) => {
    expect(describeHaunt(value)).toBe(expected)
  })
})
