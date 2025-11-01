import getShip from '../state/ship/get.ts'

export const PROVISION_TYPES = 3
export const FREE_SPACE_DAYS = 14

const calculateFreeSpace = async (ship?: Actor): Promise<number> => {
  const s = ship ?? await getShip()
  return s?.system?.attributes.crew?.max
    ? s!.system!.attributes.crew!.max * PROVISION_TYPES * FREE_SPACE_DAYS
    : 0
}

export default calculateFreeSpace
