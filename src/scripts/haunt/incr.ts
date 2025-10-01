import getHaunt from './get.ts'
import setHaunt from './set.ts'

const increaseHaunt = async (): Promise<void> => {
  const curr = getHaunt() ?? 1
  await setHaunt(curr + 1)
}

export default increaseHaunt
