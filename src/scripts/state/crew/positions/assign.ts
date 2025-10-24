import type CrawlState from '../../state.ts'
import getCopy from '../../get-copy.ts'
import getAssigned from './get.ts'
import getPositionConfig from '../../crew-config/get-position.ts'
import setAssigned from './set.ts'
import getOppositeSide from '../teams/opposite.ts'
import removeTeamMember from '../teams/remove.ts'

const assign = async (
  position: string,
  characters: string | string[],
  state?: CrawlState,
  save: boolean = true
): Promise<CrawlState | null> => {
  const cs = await getCopy(state)
  let candidate: CrawlState | null = await getCopy(cs)
  const config = getPositionConfig(position)
  const max = config?.max
  const exclusive = config?.exclusive ?? false
  const otherPositions = Object.keys(cs.crew.positions)
    .filter(key => key !== position)

  const before = (await getAssigned(position, cs)).map(actor => actor.id)
  const ids = typeof characters === 'string' ? [characters] : characters
  const after = [...new Set([...before, ...ids])]

  // Enforce maximum on positions
  if (max && after.length > max) return null

  // When assigning to exclusive position, resign any other positions
  if (exclusive) {
    for (const other of otherPositions) {
      candidate.crew.positions[other] = candidate.crew.positions[other]
        .filter(id => !ids.includes(id))
    }
  }

  // Resign from any other exclusive position you have
  const otherExclusive = otherPositions.filter(key => getPositionConfig(key)?.exclusive ?? false)
  for (const other of otherExclusive) {
    candidate.crew.positions[other] = candidate.crew.positions[other]
      .filter(id => !ids.includes(id))
  }

  // Quartermaster and sailing master each lead a watch crew
  const officers = ['quartermaster', 'master']
  if (officers.includes(position)) {
    const side = candidate.crew.teams.starboard.officer === position ? 'starboard' : 'larboard'
    const other = getOppositeSide(side)
    removeTeamMember(other, ids, candidate)
    candidate.crew.teams[side].members.push(...ids)
  }

  return await setAssigned(position, after, candidate, save)
}

export default assign
