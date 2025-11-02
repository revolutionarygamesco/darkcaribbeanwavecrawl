export const KNOTS_PER_CARGO = 0.5

const cargoSpeedReduction = (ship: Actor): number => {
  if (ship.type !== 'vehicle') return 0
  const cargo = ship.system?.attributes.cargo?.value ?? 0
  return cargo * KNOTS_PER_CARGO
}

export default cargoSpeedReduction
