import romanize from './romanize'

describe('romanize', () => {
  it.each([
    [1, 'I'],
    [2, 'II'],
    [3, 'III'],
    [4, 'IV'],
    [5, 'V'],
    [6, 'VI']
  ])(`translates %d to %s`, (num: number, roman: string) => {
    expect(romanize(num)).toBe(roman)
  })
})
