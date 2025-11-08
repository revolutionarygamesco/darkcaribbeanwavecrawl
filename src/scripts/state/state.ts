export type Position = string
export type ActorID = string
export type CrawlTeamOfficer = 'quartermaster' | 'master'
export type CrawlTeamSide = 'starboard' | 'larboard'

export interface Exploit {
  history: string
  legend: string[]
}

export interface Ghost {
  id: string
  names: {
    haunted: string
    human: string
  }
  actor?: string
  notes: string,
  status: {
    seen: boolean,
    named: boolean
  }
}

export interface CrawlTeam {
  officer: CrawlTeamOfficer
  helm?: string
  lookout?: string
  members: string[]
  onDuty: boolean
}

export interface ActorListing {
  id: string
  name: string
  img: string
  link: string
}

export interface GlossedPositionData {
  id: string
  assigned: ActorID[]
  title: string
  description: string
  sans: string
  actors: ActorListing[]
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
  exploits: Record<string, Exploit[]>
  provisions: CrawlProvisions
  silver: CrawlSilver
  ship: CrawlShip
  timestamp: number
  chapter: number
  winds: number
  ghosts: Ghost[]
}

export default CrawlState
