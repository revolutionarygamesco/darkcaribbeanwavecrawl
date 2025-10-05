import pickRandomElement from './pick.ts'

describe('pickRandomElement', () => {
  it('picks one random number from an array', () => {
    const arr = [1, 2, 3]
    const actual = pickRandomElement(arr)
    expect(arr).toContain(actual)
  })

  it('picks one random string from an array', () => {
    const arr = ['a', 'b', 'c']
    const actual = pickRandomElement(arr)
    expect(arr).toContain(actual)
  })
})
