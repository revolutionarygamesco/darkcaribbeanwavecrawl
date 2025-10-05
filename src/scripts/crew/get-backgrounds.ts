const getBackgrounds = (actor: Actor): string[] => {
  return Array.from(actor.collections.items.values())
    .filter(item => item.type === 'background')
    .map(item => item.name.toLowerCase())
}

export default getBackgrounds
