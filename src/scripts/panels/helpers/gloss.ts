import { MODULE_ID } from '../../settings.ts'
import { GlossedPositionData } from '../../state/state.ts'
import localize from '../../utilities/localize.ts'
import mapIdsToActors from '../../utilities/map-ids-to-actors.ts'

const glossPosition = (id: string, assigned: string[]): GlossedPositionData => {
  const keyPrefix = `${MODULE_ID}.crew-panel.positions.glossary.${id}`

  return {
    id,
    assigned,
    actors: mapIdsToActors(assigned),
    title: localize(`${keyPrefix}.title`),
    description: localize(`${keyPrefix}.desc`),
    sans: localize(`${keyPrefix}.sans`)
  }
}

export default glossPosition
