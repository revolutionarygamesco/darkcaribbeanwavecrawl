import getDate from './get.ts'

const ringBell = (time: Date = getDate()): boolean => {
  const m = time.getMinutes()
  return (m === 0) || (m === 30)
}

export default ringBell
