import CrewConfig, { PositionConfig } from './crew-config.ts'
import getCrewConfig from './get.ts'

const getPositionConfig = (key: string): PositionConfig | null => {
  const config = getCrewConfig()
  return config[key as keyof CrewConfig] ?? null
}

export default getPositionConfig
