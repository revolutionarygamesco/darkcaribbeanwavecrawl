import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getStartDate = (): Date => {
  const defaultStart = '24 July 1715'
  const str = game.settings.get<string>(MODULE_ID, MODULE_SETTINGS.STARTDATE) ?? defaultStart
  const date = new Date(str)
  return isNaN(date.getTime()) ? new Date(defaultStart) : date
}

export default getStartDate
