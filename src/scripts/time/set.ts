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
  const year = options.year ?? baseline.getUTCFullYear()
  const month = options.month ? options.month - 1 : baseline.getUTCMonth()
  const date = options.date ?? baseline.getUTCDate()
  const hour = options.hour ? options.hour + 5 : baseline.getUTCHours()
  const minute = options.minute ?? baseline.getUTCMinutes()
  const d = new Date(Date.UTC(year, month, date, hour, minute, 0, 0))
  if (save) await game.time.set(Math.floor(d.getTime() / 1000))
  return d
}

export default setTime
