import { MODULE_ID, MODULE_SETTINGS } from '../settings.ts'

const setAssignments = async (assignments: Record<string, string[]>): Promise<Record<string, string[]>> => {
  await game.settings.set<Record<string, string[]>>(MODULE_ID, MODULE_SETTINGS.CREW, assignments)
  return assignments
}

export default setAssignments
