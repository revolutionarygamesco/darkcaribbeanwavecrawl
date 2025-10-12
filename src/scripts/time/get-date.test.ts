import getDate from './get-date.ts'

describe('getDate', () => {
  it('returns the date', () => {
    const now = new Date()
    expect(getDate(now.getTime())).toEqual(now)
  })
})
