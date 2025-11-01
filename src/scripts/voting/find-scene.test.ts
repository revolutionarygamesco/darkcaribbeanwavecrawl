import { VotingSize } from './types.ts'
import ids from '../ids.ts'
import findScene from './find-scene.ts'

describe('findScene', () => {
  it.each([
    ['small', ids.voting.small.scene],
    ['medium', ids.voting.medium.scene],
    ['large', ids.voting.large.scene]
  ] as [VotingSize, string][])('identifies the %s voting scene', (expected, id) => {
    expect(findScene(id)).toBe(expected)
  })

  it('returns null if given a bad ID', () => {
    expect(findScene('nope')).toBeNull()
  })
})
