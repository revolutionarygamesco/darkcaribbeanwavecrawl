import { MODULE_ID, MODULE_SETTINGS } from '../../settings.ts'
import type CrewConfig from './crew-config.ts'

const setCrewConfig = async (config: CrewConfig): Promise<CrewConfig> => {
  const json = JSON.stringify(config)
  await game.settings.set<string>(MODULE_ID, MODULE_SETTINGS.CREW_CONFIG, json)
  return config
}

export default setCrewConfig
