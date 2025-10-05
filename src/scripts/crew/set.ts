import type { Assignment } from './Assignment.ts'
import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const setCrewAssignments = async (assignments: Record<string, Assignment>): Promise<Record<string, Assignment>> => {
  await game.settings.set<Record<string, Assignment>>(MODULE_ID, MODULE_SETTINGS.CREW, assignments)
  return assignments
}

export default setCrewAssignments
