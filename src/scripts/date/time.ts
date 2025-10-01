const createTime = (hour: number, midnight: Date): Date => {
  const d = new Date(midnight)
  d.setHours(hour, 0, 0, 0)
  return d
}

const withinMinute = (t1: Date, t2: Date): boolean => {
  return Math.abs(t1.getTime() - t2.getTime()) <= (60 * 1000)
}

interface Watch {
  name: string
  start: number
  end: number
}

const getTime = (date: Date): { text: string, watch: string, bells: number } => {
  const watches: Watch[] = [
    { name: 'First', start: 20, end: 24 },
    { name: 'Middle', start: 0, end: 4 },
    { name: 'Morning', start: 4, end: 8 },
    { name: 'Forenoon', start: 8, end: 12 },
    { name: 'Afternoon', start: 12, end: 16 },
    { name: 'First Dog', start: 16, end: 18 },
    { name: 'Second Dog', start: 18, end: 20 }
  ]

  const lastMidnight = createTime(0, date)
  if (withinMinute(date, lastMidnight)) return { text: 'First Watch, 8 bells', watch: 'First', bells: 8 }

  const watch = watches.find(({ start, end }) => {
    const startTime = createTime(start, lastMidnight)
    const endTime = createTime(end, lastMidnight)
    return date > startTime && date <= endTime
  })

  if (!watch) return { text: 'Lost Watch', watch: 'Lost', bells: 0 }

  const watchStart = createTime(watch.start, lastMidnight)
  const watchEnd = createTime(watch.end, lastMidnight)
  const minutesSinceStart = (date.getTime() - watchStart.getTime()) / (1000 * 60)
  const bells = withinMinute(date, watchEnd)
    ? 8
    : Math.floor(minutesSinceStart / 30)

  const watchText = `${watch.name} Watch`
  const pluralizedBells = bells === 1 ? 'bell' : 'bells'
  const bellText = bells === 0 ? '' : `, ${bells} ${pluralizedBells}`
  const text = watchText + bellText

  return { text, watch: watch.name, bells }
}

export default getTime
