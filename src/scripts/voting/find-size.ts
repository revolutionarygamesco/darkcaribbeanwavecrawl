import { VotingSize } from './types.ts'

const findSize = (n: number): VotingSize => {
  if (n > 150) return 'large'
  if (n >= 50) return 'medium'
  return 'small'
}

export default findSize
