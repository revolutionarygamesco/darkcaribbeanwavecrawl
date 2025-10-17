import describeWinds from './describe.ts'

describe('describeWinds', () => {
  it.each([
    [-1, 'Calm'],
    [0, 'Calm'],
    [1, 'Calm'],
    [2, 'Breeze'],
    [3, 'Gale'],
    [4, 'Storm'],
    [5, 'Storm'],
    [10, 'Storm']
  ]as [number, string][])('describes %d as %s', (value, expected) => {
    expect(describeWinds(value)).toBe(expected)
  })
})
