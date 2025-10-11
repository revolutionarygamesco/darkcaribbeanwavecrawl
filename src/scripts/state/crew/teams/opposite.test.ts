import { CrawlTeamSide } from '../../state.ts'
import getOppositeSide from './opposite.ts'

describe('getOppositeSide', () => {
  it.each([
    ['starboard', 'larboard'],
    ['larboard', 'starboard']
  ] as CrawlTeamSide[][])('returns %s as the opposite of %s', (expected, input) => {
    expect(getOppositeSide(input)).toBe(expected)
  })
})
