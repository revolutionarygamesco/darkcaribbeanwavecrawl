import getDate from './get-date.ts'

export interface SetTimeOptions {
  year: number
  month: number
  date: number
  hour: number
  minute: number
}

const setTime = async (
  options: Partial<SetTimeOptions>,
  baseline: Date = getDate(),
  save: boolean = true
): Promise<Date> => {
  const year = options.year === undefined ? baseline.getUTCFullYear() : options.year
  const month = options.month === undefined ? baseline.getUTCMonth() : options.month
  const date = options.date === undefined ? baseline.getUTCDate() : options.date
  const hour = options.hour === undefined ? baseline.getUTCHours() : options.hour
  const minute = options.minute === undefined ? baseline.getUTCMinutes() : options.minute
  const d = new Date(Date.UTC(year, month, date, hour, minute, 0, 0))
  if (save) await game.time.set(Math.floor(d.getTime() / 1000))
  return d
}

export default setTime
