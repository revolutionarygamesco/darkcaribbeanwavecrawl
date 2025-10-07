import getCrewAssignments from './get.ts'

const getAssignmentsByActorId = (): Array<{ id: string, assignments: string[] }> => {
  const assignments = Object.values(getCrewAssignments())
  const data = new Map<string, string[]>()

  for (const assignment of assignments) {
    for (const id of assignment.assigned) {
      const existing = data.get(id) ?? []
      data.set(id, [...existing, assignment.id])
    }
  }

  return Array.from(data).map(entry => ({
    id: entry[0],
    assignments: entry[1]
  }))
}

export default getAssignmentsByActorId
