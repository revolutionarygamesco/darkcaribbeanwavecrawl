import tokenPositionInRegions, { TokenPosition } from './token-position-in-regions.ts'

interface TokenMovementData {
  origin: TokenPosition
  destination: TokenPosition
  [key: string]: any
}

const tokenMovementDataRegionsChanged = (scene: Scene, movement: TokenMovementData): boolean => {
  const regions = Array.from(scene.regions.values()) as Region[]
  const before = tokenPositionInRegions(regions, movement.origin)
  const after = tokenPositionInRegions(regions, movement.destination)
  return before !== after
}

export default tokenMovementDataRegionsChanged
