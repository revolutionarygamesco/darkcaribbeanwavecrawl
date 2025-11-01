export type VotingSize = 'large' | 'medium' | 'small'
export type VotingChoice = 'yea' | 'undecided' | 'nay'

export interface VotingMarshallingZone {
  columns: [number, number]
  rows: [number, number]
}
