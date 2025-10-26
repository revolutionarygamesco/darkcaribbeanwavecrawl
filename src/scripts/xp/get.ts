const getSailingExperience = (actor: Actor): Array<{ item: string, source: string }> => {
  return Array.from(actor.collections.items.values())
    .filter(item => item.type === 'feature' && item.system?.featureType === 'Sailing Experience')
    .map(item => ({ item: item.id, source: (item as any)._stats.compendiumSource }))
    .filter((i: unknown): i is { item: string, source: string } => {
      if (!(typeof i === 'object' && i !== null && 'item' in i && 'source' in i)) return false
      const { item, source } = i
      return typeof item === 'string' && typeof source === 'string'
    })
}

export default getSailingExperience
