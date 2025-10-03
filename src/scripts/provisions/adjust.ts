import type ProvisionsType from './ProvisionsType.ts'
import getProvisions from './get.ts'
import setProvisions from './set.ts'

const adjustProvisions = async (type: ProvisionsType, amount: number): Promise<number> => {
  const before = getProvisions(type)
  const adjusted = Math.max(before + amount, 0)
  await setProvisions(type, amount)
  return adjusted
}

export default adjustProvisions
