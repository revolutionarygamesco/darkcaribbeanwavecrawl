import { MODULE_ID, SKIP_NEXT_ADVANCE } from '../../settings.ts'
import setTime, { SetTimeOptions } from '../../time/set.ts'
import getAdventure from '../../state/get-adventure.ts'
import saveCrawlState from '../../state/save.ts'
import setCrawlState from '../../state/set.ts'
import updateState from '../../state/update.ts'
import getCrawlState from '../../state/get.ts'

const parseSetTimeSelect = (
  coll: HTMLFormControlsCollection,
  field: string,
  fallback: number
): number => {
  const select = coll[field as any] as HTMLSelectElement
  const parsed = parseInt(select.value)
  return isNaN(parsed) ? fallback : parsed
}

const openSetTimeDialog = async (onComplete?: () => Promise<void>): Promise<void> => {
  const curr = new Date(game.time.worldTime)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const years: string[] = []
  for (let year = 1600; year < 1800; year++) {
    const option = curr.getUTCFullYear() === year
      ? `<option selected>${year}</option>`
      : `<option>${year}</option>`
    years.push(option)
  }

  const months: string[] = []
  for (let month = 0; month < 12; month++) {
    const option = curr.getUTCMonth() === month
      ? `<option value="${month}" selected>${monthNames[month]}</option>`
      : `<option value="${month}">${monthNames[month]}</option>`
    months.push(option)
  }

  const days: string[] = []
  for (let day = 1; day < 32; day++) {
    const option = curr.getUTCDate() === day
      ? `<option selected>${day}</option>`
      : `<option>${day}</option>`
    days.push(option)
  }

  const hours: string[] = []
  for (let hour = 0; hour < 24; hour++) {
    const option = curr.getUTCHours() === hour
      ? `<option selected>${hour}</option>`
      : `<option>${hour}</option>`
    hours.push(option)
  }

  const minutes: string[] = []
  for (let minute = 0; minute < 60; minute++) {
    const option = curr.getUTCMinutes() === minute
      ? `<option selected>${minute}</option>`
      : `<option>${minute}</option>`
    minutes.push(option)
  }

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-set-time`,
    window: { title: 'Set the date' },
    content: `
      <label for="set-time-year">Year</label><select id="set-time-year" name="year">${years.join('')}</select>
      <label for="set-time-month">Month</label><select id="set-time-month" name="month">${months.join('')}</select>
      <label for="set-time-date">Day</label><select id="set-time-date" name="date">${days.join('')}</select>
      <label for="set-time-hour">Hour</label><select id="set-time-hour" name="hour">${hours.join('')}</select>
      <label for="set-time-minute">Minute</label><select id="set-time-minute" name="minute">${minutes.join('')}</select>
      `,
    buttons: [
      {
        action: 'set',
        label: 'Set Time',
        default: true,
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const options: SetTimeOptions = {
            year: parseSetTimeSelect(coll, 'year', curr.getUTCFullYear()),
            month:parseSetTimeSelect(coll, 'month', curr.getUTCMonth()),
            date: parseSetTimeSelect(coll, 'date', curr.getUTCDate()),
            hour: parseSetTimeSelect(coll, 'hour', curr.getUTCHours()),
            minute: parseSetTimeSelect(coll, 'minute', curr.getUTCMinutes())
          }

          const adventure = await getAdventure()
          if (adventure) adventure.setFlag(MODULE_ID, SKIP_NEXT_ADVANCE, true)

          await setTime(options, curr, true, true)
          await saveCrawlState(await setCrawlState(await updateState(await getCrawlState())))
          if (onComplete) await onComplete()
        }
      }
    ]
  })

  await dialog.render(true)
}

export default openSetTimeDialog
