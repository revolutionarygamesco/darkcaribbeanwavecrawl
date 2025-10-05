export interface Assignment {
  id: string
  assigned: string[]
  shares: number
}

export interface GlossedAssignment extends Assignment {
  title: string
  desc: string
  sans: string
  actors: Actor[]
}
