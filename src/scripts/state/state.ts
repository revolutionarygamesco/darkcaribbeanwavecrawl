export type Position = string
export type ActorID = string
export type CrawlTeamOfficer = 'quartermaster' | 'sailing-master'
export type CrawlTeamSide = 'starboard' | 'larboard'

export interface CrawlTeam {
  officer: CrawlTeamOfficer
  helm?: string
  lookout?: string
  crew: string[]
}

export interface CrawlCrew {
  positions: Record<Position, ActorID[]>
  teams: Record<CrawlTeamSide, CrawlTeam>
  xp: Record<ActorID, Record<Position, number>>
}

export interface CrawlProvisions {
  food: number
  water: number
  rum: number
}

export interface CrawlSilver {
  ship: number
  crew: Record<ActorID, number>
}

export interface CrawlShip {
  actor?: ActorID
  barnacles: number
}

interface CrawlState {
  crew: CrawlCrew
  provisions: CrawlProvisions
  silver: CrawlSilver
  ship: CrawlShip
  minutes: number
  chapter: number
  winds: number
  haunt: number
}

export default CrawlState
