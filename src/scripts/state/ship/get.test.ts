import type CrawlState from '../state.ts'
import setupCrew, { setupState, william } from '../../utilities/testing/crew.ts'
import getShip from './get.ts'

describe('getShip', () => {
  setupCrew()
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it('gets the ship from the state', async () => {
    const ship = await getShip(state)
    expect(ship?.id).toBe(william.id)
  })

  it('returns null if there is no ship', async () => {
    state.ship.actor = 'nope'
    const ship = await getShip(state)
    expect(ship).toBeNull()
  })
})
