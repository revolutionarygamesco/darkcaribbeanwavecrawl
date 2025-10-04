import { MODULE_ID } from '../settings.ts'
import makeOxfordList from './oxford.ts'

describe('makeOxfordList', () => {
  it('returns a null string if not given any items', () => {
    expect(makeOxfordList()).toBe('')
  })

  it('returns a single item', () => {
    const actual = makeOxfordList('vittles')
    expect(actual).toBe('vittles')
  })

  it('ands two items', () => {
    const actual = makeOxfordList('vittles', 'fresh water')
    expect(actual).toBe(`vittles ${MODULE_ID}.and fresh water`)
  })

  it('makes a list of three or more items with Oxford commas', () => {
    const actual = makeOxfordList('vittles', 'fresh water', 'rum')
    expect(actual).toBe(`vittles, fresh water, ${MODULE_ID}.and rum`)
  })
})
