import type CrawlState from '../../state.ts'
import getCrawlState from '../../get.ts'
import getShip from '../../ship/get.ts'
import calculateIdealSpeed from './ideal.ts'
import cargoSpeedReduction from './cargo.ts'
import windSpeedFactor from './wind.ts'
import foulingSpeedFactor from './fouling.ts'

const calculateSpeed = async (ship?: Actor, state?: CrawlState): Promise<number> => {
  const cs = state ?? await getCrawlState()
  const subject = ship ?? await getShip(cs)
  if (!subject || subject.type !== 'vehicle') return 0

  const ideal = calculateIdealSpeed(subject)
  const cargo = cargoSpeedReduction(subject)
  const wind = await windSpeedFactor(cs)
  const fouling = cs.ship.actor === subject.id
    ? await foulingSpeedFactor(cs)
    : Math.random() * (1 - (2/3)) + (2/3)

  return (ideal - cargo) * wind * fouling
}

export default calculateSpeed
