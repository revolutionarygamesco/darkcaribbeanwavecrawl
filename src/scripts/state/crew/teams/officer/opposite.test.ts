import { CrawlTeamOfficer } from '../../../state.ts'
import getOppositeOfficer from './opposite.ts'

describe('getOppositeOfficer', () => {
  it.each([
    ['quartermaster', 'sailing-master'],
    ['sailing-master', 'quartermaster']
  ] as CrawlTeamOfficer[][])('returns %s as the opposite of %s', (expected, input) => {
    expect(getOppositeOfficer(input)).toBe(expected)
  })
})
