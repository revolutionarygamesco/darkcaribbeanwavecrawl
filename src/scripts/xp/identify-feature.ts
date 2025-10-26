import ids from '../ids.ts'

interface SailingXPFeature {
  xp: number
  position: string
  id: string
}

const identifySailingXPFeature = (id: string): SailingXPFeature | null => {
  for (const position in ids.xp) {
    const key = position as keyof typeof ids.xp
    if (ids.xp[key].able === id) return { xp: 1000, position, id }
    if (ids.xp[key].seasoned === id) return { xp: 5000, position, id }
    if (ids.xp[key].veteran === id) return { xp: 10000, position, id }
  }

  return null
}

export default identifySailingXPFeature
