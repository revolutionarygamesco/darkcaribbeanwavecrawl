import { Ghost } from '../state.ts'

export type HauntLevel = 'normal' | 'bloody' | 'dark' | 'lost'

interface GhostReport {
  haunt: HauntLevel,
  ghosts: Ghost[]
}

export default GhostReport
