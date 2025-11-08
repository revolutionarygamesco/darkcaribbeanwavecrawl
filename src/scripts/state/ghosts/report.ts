import { Ghost } from '../state.ts'

export type HauntLevel = 'normal' | 'bloody' | 'dark' | 'lost'

interface GhostReport {
  haunt: HauntLevel
  haunting: Ghost[]
  potential: Ghost[]
}

export default GhostReport
