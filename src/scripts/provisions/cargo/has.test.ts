import { william } from '../../utilities/testing/crew.ts'
import hasOpenCargoSlot from './has.ts'

describe('hasOpenCargoSlot', () => {
  it('returns true if the ship has an open cargo slot', async () => {
    william.system!.attributes.cargo = { value: 0, max: 2 }
    expect(await hasOpenCargoSlot(william)).toBe(true)
  })

  it('returns false if the ship has no open cargo slots', async () => {
    william.system!.attributes.cargo = { value: 2, max: 2 }
    expect(await hasOpenCargoSlot(william)).toBe(false)
  })
})
