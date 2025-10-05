import type { Assignment } from './Assignment.ts'
import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const getCrewAssignments = (): Record<string, Assignment> => {
  return game.settings.get<Record<string, Assignment>>(MODULE_ID, MODULE_SETTINGS.CREW) as Record<string, Assignment> ?? {}
}

export default getCrewAssignments
