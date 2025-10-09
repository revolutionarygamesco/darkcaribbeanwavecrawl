export interface CrawlTeam {
  officer: 'quartermaster' | 'sailing-master'
  helm: string
  lookout: string
  crew: string[]
}

export interface CrawlCrew {
  positions: Map<string, string[]>
  teams: [CrawlTeam, CrawlTeam],
  xp: Map<string, Map<string, number>>
}

export interface CrawlDate {
  start: Date
  minutes: number
}

export interface CrawlProvisions {
  food: number
  water: number
  rum: number
}

export interface CrawlSilver {
  ship: number
  crew: Map<string, number>
}

export interface CrawlShip {
  actor: string
  token: string
}

interface CrawlState {
  date: CrawlDate
  crew: CrawlCrew
  provisions: CrawlProvisions
  silver: CrawlSilver
  ship: CrawlShip
  chapter: number
  winds: number
  haunt: number
}

export default CrawlState
