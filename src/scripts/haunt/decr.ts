import getHaunt from './get.ts'
import setHaunt from './set.ts'

const decreaseHaunt = async (): Promise<void> => {
  const curr = getHaunt() ?? 1
  await setHaunt(curr - 1)
}

export default decreaseHaunt
