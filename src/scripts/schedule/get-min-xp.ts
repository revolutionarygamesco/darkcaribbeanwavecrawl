import ids from '../ids.ts'

const getMinXP = (id: string): number => {
  for (const position in ids.xp) {
    const key = position as keyof typeof ids.xp
    if (ids.xp[key].able === id) return 1000
    if (ids.xp[key].seasoned === id) return 5000
    if (ids.xp[key].veteran === id) return 10000
  }

  return 0
}

export default getMinXP
