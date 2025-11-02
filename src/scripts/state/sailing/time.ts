import getCrawlState from '../get.ts'
import { MILES_PER_NAUTICAL_MILE } from './speed/ideal.ts'
import calculateSpeed from './speed/calculate.ts'

const calculateTime = async (speed?: number): Promise<number> => {
  const knots = speed ?? await calculateSpeed(undefined, await getCrawlState())
  if (knots === 0) return Infinity

  const distance = 50 * MILES_PER_NAUTICAL_MILE
  return Math.ceil((distance / knots) * 60)
}

export default calculateTime
