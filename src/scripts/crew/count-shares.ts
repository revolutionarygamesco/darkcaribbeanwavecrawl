import type { Assignment } from './Assignment.ts'

const countShares = (
  crew: Record<string, Assignment>
): {
  total: number,
  shares: Record<string, number>
} => {
  const shares: Record<string, number> = {}
  const assignments = Object.values(crew)

  for (const assignment of assignments) {
    for (const id of assignment.assigned) {
      const prev = shares[id] ?? 0
      shares[id] = Math.max(prev, assignment.shares)
    }
  }

  const total = Object.values(shares).reduce((acc, curr) => acc + curr, 0)
  return { total, shares }
}

export default countShares
