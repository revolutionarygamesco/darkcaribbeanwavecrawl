import getTitle from './title'

describe('getTitle', () => {
  it.each([
    [1, 'Chapter I.'],
    [2, 'Chapter II.'],
    [3, 'Chapter III.'],
    [4, 'Chapter IV.'],
    [5, 'Chapter V.'],
    [6, 'Chapter VI.']
  ])(`translates %d to %s`, (num: number, title: string) => {
    expect(getTitle(num)).toBe(title)
  })
})
