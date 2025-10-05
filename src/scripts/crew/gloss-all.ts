import type { GlossedAssignment } from './Assignment.ts'
import glossAssignment from './gloss.ts'
import getCrewAssignments from './get.ts'

const glossAllAssignments = async (): Promise<Record<string, GlossedAssignment>> => {
  const assignments = getCrewAssignments()
  const glossed: Record<string, GlossedAssignment> = {}

  for (const id in assignments) {
    glossed[id] = await glossAssignment(assignments[id])
  }

  return glossed
}

export default glossAllAssignments
