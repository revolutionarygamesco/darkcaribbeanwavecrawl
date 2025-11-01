import { VotingSize } from './types.ts'
import findSize from './find-size.ts'

describe('findSize', () => {
  it.each([
    [-1, 'small'],
    [0, 'small'],
    [1, 'small'],
    [49, 'small'],
    [50, 'medium'],
    [150, 'medium'],
    [151, 'large'],
    [350, 'large'],
    [8500000000, 'large']
  ] as [number, VotingSize][])('describes %d as %s', (n, expected) => {
    expect(findSize(n)).toBe(expected)
  })
})
