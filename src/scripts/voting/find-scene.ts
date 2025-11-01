import { VotingSize } from './types.ts'
import ids from '../ids.ts'

const findScene = (id: string): VotingSize | null => {
  if (ids.voting.large.scene === id) return 'large'
  if (ids.voting.medium.scene === id) return 'medium'
  if (ids.voting.small.scene === id) return 'small'
  return null
}

export default findScene
