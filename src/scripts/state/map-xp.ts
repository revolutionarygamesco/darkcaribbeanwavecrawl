const mapXP = (record: Record<string, Record<string, number>>): Map<string, Map<string, number>> => {
  const map = new Map<string, Map<string, number>>()
  for (const actor in record) {
    const positions = record[actor]
    const xp = new Map<string, number>()
    for (const position in positions) {
      xp.set(position, positions[position])
    }
    map.set(actor, xp)
  }
  return map
}

export default mapXP
