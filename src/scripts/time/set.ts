import { MODULE_ID, SAVE_STATE } from '../settings.ts'
import getEarliestCrawlState from '../state/get-earliest-crawl-state.ts'
import getAdventure from '../state/get-adventure.ts'

export interface SetTimeOptions {
  year: number
  month: number
  date: number
  hour: number
  minute: number
}

const allowDateSet = async (date: Date): Promise<void> => {
  const earliest = await getEarliestCrawlState()
  if (!earliest || earliest.timestamp <= date.getTime()) return

  const adventure = await getAdventure()
  if (!adventure) return

  await adventure.setFlag(MODULE_ID, SAVE_STATE, [])
}

const setTime = async (
  options: Partial<SetTimeOptions>,
  baseline?: Date,
  save: boolean = true,
  allowEarlierDate: boolean = false
): Promise<Date> => {
  const base = baseline ?? new Date(game.time.worldTime ?? 0)
  const year = options.year === undefined ? base.getUTCFullYear() : options.year
  const month = options.month === undefined ? base.getUTCMonth() : options.month
  const date = options.date === undefined ? base.getUTCDate() : options.date
  const hour = options.hour === undefined ? base.getUTCHours() : options.hour
  const minute = options.minute === undefined ? base.getUTCMinutes() : options.minute
  const d = new Date(Date.UTC(year, month, date, hour, minute, 0, 0))
  if (allowEarlierDate) await allowDateSet(d)
  if (save) await game.time.set(d.getTime())
  return d
}

export default setTime
