import getDateKey from './key.ts'

describe('getDateKey', () => {
  it('returns ket from date', () => {
    expect(getDateKey(new Date('24 July 1715'))).toBe('1715-07-24')
  })
})
