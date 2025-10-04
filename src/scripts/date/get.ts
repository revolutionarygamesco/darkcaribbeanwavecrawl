import getStartDate from './get-start.ts'
import getMinutes from './get-minutes.ts'

const getDate = (start: Date = getStartDate(), minutes: number = getMinutes()): Date => {
  const msPerMinute = 60 * 1000
  return new Date(start.getTime() + (minutes * msPerMinute))
}

export default getDate
