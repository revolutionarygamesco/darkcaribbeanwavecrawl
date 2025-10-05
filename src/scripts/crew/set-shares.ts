import type { Assignment } from './Assignment.ts'
import getCrewAssignments from './get.ts'
import setCrewAssignments from './set.ts'

const setShares = async (id: string, shares: number): Promise<Record<string, Assignment>> => {
  const curr = getCrewAssignments()
  if (!(id in curr)) return curr
  curr[id].shares = shares
  return await setCrewAssignments(curr)
}

export default setShares
