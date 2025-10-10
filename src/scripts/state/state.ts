export interface CrawlTeam {
  officer: 'quartermaster' | 'sailing-master'
  helm?: string
  lookout?: string
  crew: string[]
}

export interface CrawlCrew {
  positions: Record<string, string[]>
  teams: {
    starboard: CrawlTeam
    larboard: CrawlTeam
  }
  xp: Record<string, Record<string, number>>
}

export interface CrawlProvisions {
  food: number
  water: number
  rum: number
}

export interface CrawlSilver {
  ship: number
  crew: Record<string, number>
}

export interface CrawlShip {
  actor: string
  token: string
}

interface CrawlState {
  crew: CrawlCrew
  provisions: CrawlProvisions
  silver: CrawlSilver
  ship?: CrawlShip
  minutes: number
  chapter: number
  winds: number
  haunt: number
}

export default CrawlState
