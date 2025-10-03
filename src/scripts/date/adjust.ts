import getMinutes from './get-minutes.ts'
import setMinutes from './set-minutes.ts'

const adjustTime = async (minutes: number): Promise<void> => {
  const before = getMinutes()
  await setMinutes(before + minutes)
}

export default adjustTime
