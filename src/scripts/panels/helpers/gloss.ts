import { MODULE_ID } from '../../settings.ts'
import { PositionData, GlossedPositionData } from '../../state/state.ts'
import localize from '../../utilities/localize.ts'
import mapIdsToActors from '../../utilities/map-ids-to-actors.ts'

const glossPosition = (id: string, position: PositionData): GlossedPositionData => {
  const keyPrefix = `${MODULE_ID}.crew-panel.positions.glossary.${id}`

  return {
    ...position,
    actors: mapIdsToActors(position.assigned),
    title: localize(`${keyPrefix}.title`),
    description: localize(`${keyPrefix}.desc`),
    sans: localize(`${keyPrefix}.sans`)
  }
}

export default glossPosition
