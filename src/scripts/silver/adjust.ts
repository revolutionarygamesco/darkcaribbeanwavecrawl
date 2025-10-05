import getSilver from './get.ts'
import setSilver from './set.ts'

const adjustSilver = async (amount: number): Promise<number> => {
  const before = getSilver()
  return await setSilver(before + amount)
}

export default adjustSilver
