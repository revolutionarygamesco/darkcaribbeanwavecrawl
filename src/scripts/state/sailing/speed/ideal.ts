export const MILES_PER_NAUTICAL_MILE = 0.868976

const calculateIdealSpeed = (ship: Actor): number => {
  if (ship.type !== 'vehicle') return 0
  const speed = ship.system?.attributes.speed?.value ?? 0
  const milesPerDay = 50 * speed
  const nauticalMilesPerDay = milesPerDay / MILES_PER_NAUTICAL_MILE
  return nauticalMilesPerDay / 24
}

export default calculateIdealSpeed
