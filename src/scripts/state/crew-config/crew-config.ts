export interface PositionConfig {
  shares?: number
  max?: number
  exempt?: boolean
  exclusive?: boolean
  required?: boolean
  votes?: number
}

interface CrewConfig {
  captain?: PositionConfig
  quartermaster?: PositionConfig
  master?: PositionConfig
  bosun?: PositionConfig
  gunner?: PositionConfig
  carpenter?: PositionConfig
  surgeon?: PositionConfig
  priest?: PositionConfig
  sorcerer?: PositionConfig
  mate?: PositionConfig
  cooper?: PositionConfig
  armorer?: PositionConfig
  musician?: PositionConfig
  sailmaker?: PositionConfig
  cook?: PositionConfig
  crew?: PositionConfig
  land?: PositionConfig
  child?: PositionConfig
  forced?: PositionConfig
  slave?: PositionConfig
}

export default CrewConfig
