export interface SetTimeOptions {
  year: number
  month: number
  date: number
  hour: number
  minute: number
}

const setTime = async (
  options: Partial<SetTimeOptions>,
  baseline?: Date,
  save: boolean = true
): Promise<Date> => {
  const base = baseline ?? new Date(game.time.worldTime ?? 0)
  const year = options.year === undefined ? base.getUTCFullYear() : options.year
  const month = options.month === undefined ? base.getUTCMonth() : options.month
  const date = options.date === undefined ? base.getUTCDate() : options.date
  const hour = options.hour === undefined ? base.getUTCHours() : options.hour
  const minute = options.minute === undefined ? base.getUTCMinutes() : options.minute
  const d = new Date(Date.UTC(year, month, date, hour, minute, 0, 0))
  if (save) await game.time.set(d.getTime())
  return d
}

export default setTime
