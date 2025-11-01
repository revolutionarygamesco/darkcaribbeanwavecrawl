const listRegions = (token: Token): string[] => Array.from(token.regions).map(region => region.name)

export default listRegions
