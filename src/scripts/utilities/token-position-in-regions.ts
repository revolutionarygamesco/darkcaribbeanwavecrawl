const tokenPositionInRegions = (regions: Region[], position: TokenPosition): string[] => {
  const { elevation, x, y } = position
  return regions
    .filter(region => region.testPoint({ elevation, x, y }))
    .map(region => region.name)
    .sort()
}

export default tokenPositionInRegions
