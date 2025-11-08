import { Ghost } from '../state.ts'

const getGhostID = (ghost: Partial<Ghost> | string): string => {
  if (typeof ghost === 'string') return ghost
  return ghost.id ?? ''
}

export default getGhostID
