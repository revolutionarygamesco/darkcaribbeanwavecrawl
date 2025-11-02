import { william } from '../../../utilities/testing/crew.ts'
import cargoSpeedReduction from './cargo.ts'

describe('cargoSpeedReduction', () => {
  const loadShip = (cargo: number = 0): Actor => {
    const copy = JSON.parse(JSON.stringify(william))
    if (!copy.system) copy.system = {}
    copy.system.attributes.cargo = { value: cargo, max: 2 }
    return copy
  }

  it('factors cargo into speed', () => {
    const ships = [loadShip(0), loadShip(1), loadShip(2)]
    const penalties = ships.map(ship => cargoSpeedReduction(ship))
    expect(penalties).toEqual([0, 0.5, 1])
  })
})
