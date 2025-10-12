export type Position = string
export type ActorID = string
export type CrawlTeamOfficer = 'quartermaster' | 'sailing-master'
export type CrawlTeamSide = 'starboard' | 'larboard'

export interface CrawlTeam {
  officer: CrawlTeamOfficer
  helm?: string
  lookout?: string
  members: string[]
  onDuty: boolean
}

export interface CrawlCrew {
  positions: Record<Position, ActorID[]>
  teams: Record<CrawlTeamSide, CrawlTeam>
  xp: Record<ActorID, Record<Position, number>>
}

export interface CrawlProvisionStores {
  food: number
  water: number
  rum: number
}

export type Provision = keyof CrawlProvisionStores

export interface CrawlProvisions extends CrawlProvisionStores {
  forage: boolean
}

export interface CrawlSilver {
  company: number
  crew: Record<ActorID, number>
}

export interface CrawlShipPosition {
  x: number
  y: number
  rotation: number
}

export interface CrawlShip {
  actor?: ActorID
  barnacles: number
  position: CrawlShipPosition
}

interface CrawlState {
  crew: CrawlCrew
  provisions: CrawlProvisions
  silver: CrawlSilver
  ship: CrawlShip
  timestamp: number
  chapter: number
  winds: number
  haunt: number
}

export default CrawlState
