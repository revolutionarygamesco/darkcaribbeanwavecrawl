import setupCrew, { jack } from './testing/crew.ts'
import mapIdsToActors from './map-ids-to-actors.ts'

describe('mapIdsToActors', () => {
  setupCrew()

  it('maps an array of IDs to an array of Actors', () => {
    const actual = mapIdsToActors([jack, 'nope'])
    expect(actual).toEqual([game.actors.get(jack)])
  })
})
