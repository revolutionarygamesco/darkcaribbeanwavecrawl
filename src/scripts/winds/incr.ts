import getWind from './get.ts'
import setWind from './set.ts'

const increaseWind = async (): Promise<void> => {
  const curr = getWind() ?? 1
  await setWind(curr + 1)
}

export default increaseWind
