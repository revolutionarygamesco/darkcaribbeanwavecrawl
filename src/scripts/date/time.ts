import { MODULE_ID } from '../settings.ts'

const createTime = (hour: number, midnight: Date): Date => {
  const d = new Date(midnight)
  d.setHours(hour, 0, 0, 0)
  return d
}

const withinMinute = (t1: Date, t2: Date): boolean => {
  return Math.abs(t1.getTime() - t2.getTime()) <= (60 * 1000)
}

const localize = game?.i18n?.localize ? game.i18n.localize : (key: string) => key

interface Watch {
  name: string
  start: number
  end: number
}

const getTime = (date: Date): { text: string, watch: string, bells: number } => {
  const watches: Watch[] = [
    { name: 'first', start: 20, end: 24 },
    { name: 'middle', start: 0, end: 4 },
    { name: 'morning', start: 4, end: 8 },
    { name: 'forenoon', start: 8, end: 12 },
    { name: 'afternoon', start: 12, end: 16 },
    { name: 'dog1', start: 16, end: 18 },
    { name: 'dog2', start: 18, end: 20 }
  ]

  const lastMidnight = createTime(0, date)
  if (withinMinute(date, lastMidnight)) return {
    text: localize(`${MODULE_ID}.watches.first`) + ', ' + localize(`${MODULE_ID}.bells.8`),
    watch: 'first',
    bells: 8
  }

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

  const watchText = localize(`${MODULE_ID}.watches.${watch.name}`)
  const bellText = localize(`${MODULE_ID}.bells.${bells}`)
  const text = watchText + ', ' + bellText

  return { text, watch: watch.name, bells }
}

export default getTime
