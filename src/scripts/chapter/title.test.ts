import { MODULE_ID } from '../settings.ts'
import localize from '../utilities/localize.ts'
import getTitle from './title'

describe('getTitle', () => {
  const ch = localize(`${MODULE_ID}.Chapter`)
  it.each([
    [1, `${ch} I.`],
    [2, `${ch} II.`],
    [3, `${ch} III.`],
    [4, `${ch} IV.`],
    [5, `${ch} V.`],
    [6, `${ch} VI.`]
  ])(`translates %d to %s`, (num: number, title: string) => {
    expect(getTitle(num)).toBe(title)
  })
})
