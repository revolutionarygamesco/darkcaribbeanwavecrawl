export interface CrawlTeam {
  helm?: string
  lookout?: string
  crew: string[]
}

export interface CrawlCrew {
  positions: Record<string, string[]>
  teams: {
    quartermaster: CrawlTeam
    sailmaster: CrawlTeam
  }
  xp: Record<string, Record<string, number>>
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
  crew: Record<string, number>
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
  ship?: CrawlShip
  chapter: number
  winds: number
  haunt: number
}

export default CrawlState
