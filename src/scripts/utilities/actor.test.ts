import setupCrew, { jack } from './testing/crew.ts'
import getActor from './actor.ts'

describe('getActor', () => {
  setupCrew()
  let expected: Actor

  beforeEach(() => {
    expected = game.actors.get(jack)!
  })

  it('returns the Actor if given a string', () => {
    const actual = getActor(jack)
    expect(actual).toEqual(expected)
  })

  it('returns null if not given a valid string', () => {
    const actual = getActor('nope')
    expect(actual).toBeNull()
  })

  it('returns the Actor if given an Actor', () => {
    const actual = getActor(expected)
    expect(actual).toEqual(expected)
  })
})
