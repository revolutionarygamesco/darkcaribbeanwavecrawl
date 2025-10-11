import initCrawlState from '../../init.ts'
import setAssigned from './set.ts'

describe('setAssigned', () => {
  it.each([
    ['captain', 'calico-jack'],
    ['gunner', ['anne-bonny', 'mary-read']],
    ['captain', []]
  ] as [string, string | string[]][])('sets %s to %s', async (position, value) => {
    const before = initCrawlState()
    const after = await setAssigned(position, value, before, true)
    const arr = typeof value === 'string' ? [value] : value
    expect(after.crew.positions[position]).toHaveLength(arr.length)
    expect(after.crew.positions[position]).toEqual(arr)
    expect(after).not.toBe(before)
  })
})
