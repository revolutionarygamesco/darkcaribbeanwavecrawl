import {MODULE_ID, DEFAULT_CREW, MODULE_SETTINGS} from '../../settings.ts'
import type CrewConfig from './crew-config.ts'

const getCrewConfig = (): CrewConfig => {
  const raw = game?.settings?.get<string>(MODULE_ID, MODULE_SETTINGS.CREW_CONFIG)
  if (!raw) return DEFAULT_CREW as CrewConfig
  return JSON.parse(raw)
}

export default getCrewConfig
