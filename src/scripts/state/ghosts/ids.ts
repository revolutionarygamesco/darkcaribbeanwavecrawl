import { Ghost } from '../state.ts'
import getGhostID from './id.ts'

const getGhostIDs = (ghosts: Array<Partial<Ghost> | string>): string[] => {
  return ghosts.map(ghost => getGhostID(ghost))
}

export default getGhostIDs
