import hourMinuteToTime from '../utilities/hour-minute-to-time.ts'

const getWatch = (hour: number, minute: number): string => {
  const time = hourMinuteToTime(hour, minute)
  if (time === 0) return 'first'
  if (time <= 400) return 'middle'
  if (time <= 800) return 'morning'
  if (time <= 1200) return 'forenoon'
  if (time <= 1600) return 'afternoon'
  if (time <= 1800) return 'first dog'
  if (time <= 2000) return 'second dog'
  return 'first'
}

export default getWatch
