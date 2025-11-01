import getShip from '../../state/ship/get.ts'

const hasOpenCargoSlot = async (ship?: Actor): Promise<boolean> => {
  const s = ship ?? await getShip()
  const cargo = s?.system?.attributes.cargo
  if (!cargo) return false

  const { max, value } = cargo
  return value < max
}

export default hasOpenCargoSlot
