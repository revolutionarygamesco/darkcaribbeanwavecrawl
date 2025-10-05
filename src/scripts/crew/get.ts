import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getAssignments = (): Record<string, string[]> => {
  return game.settings.get<Record<string, string[]>>(MODULE_ID, MODULE_SETTINGS.CREW) as Record<string, string[]> ?? {}
}

export default getAssignments
