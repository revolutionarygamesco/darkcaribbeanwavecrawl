import Watch, { isWatch, isDogWatch, getWatches } from './watch.ts'

describe('isWatch', () => {
  it.each([
    ['first', 'is', true],
    ['middle', 'is', true],
    ['morning', 'is', true],
    ['forenoon', 'is', true],
    ['afternoon', 'is', true],
    ['first dog', 'is', true],
    ['second dog', 'is', true],
    ['lalilulelo', 'is not', false]
  ] as [string, string, boolean][])('reports that %s watch %s a dog watch', (candidate, _, expected) => {
    expect(isWatch(candidate)).toBe(expected)
  })
})

describe('getWatches', () => {
  it('returns all watches', () => {
    const expected: Watch[] = ['first', 'middle', 'morning', 'forenoon', 'afternoon', 'first dog', 'second dog']
    expect(getWatches()).toEqual(expected)
  })
})

describe('isDogWatch', () => {
  it.each([
    ['first', 'is not', false],
    ['middle', 'is not', false],
    ['morning', 'is not', false],
    ['forenoon', 'is not', false],
    ['afternoon', 'is not', false],
    ['first dog', 'is', true],
    ['second dog', 'is', true]
  ] as [Watch, string, boolean][])('reports that %s watch %s a dog watch', (watch, _, expected) => {
    expect(isDogWatch(watch)).toBe(expected)
  })
})
