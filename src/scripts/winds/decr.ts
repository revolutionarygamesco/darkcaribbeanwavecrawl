import getWind from './get.ts'
import setWind from './set.ts'

const decreaseWind = async (): Promise<void> => {
  const curr = getWind() ?? 1
  await setWind(curr - 1)
}

export default decreaseWind
