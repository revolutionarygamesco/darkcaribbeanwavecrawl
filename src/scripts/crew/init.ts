import type { Assignment } from './Assignment.ts'

const ids = [
  'captain',
  'quartermaster',
  'pilot',
  'pilot-mate',
  'bosun',
  'bosun-mate',
  'gunner',
  'gunner-mate',
  'master',
  'master-mate',
  'carpenter',
  'carpenter-mate',
  'cook',
  'surgeon',
  'master-arms',
  'priest',
  'sorcerer'
]

const initialCrewAssignments = (): Record<string, Assignment> => {
  const assignments: Record<string, Assignment> = {}
  for (const id of ids) {
    assignments[id] = { id, assigned: [], shares: 1 }
  }

  return assignments
}

export default initialCrewAssignments
