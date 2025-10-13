import { MODULE_ID } from '../../settings.ts'
import { PositionData, GlossedPositionData } from '../../state/state.ts'
import localize from '../../utilities/localize.ts'

const glossPosition = (id: string, position: PositionData): GlossedPositionData => {
  const keyPrefix = `${MODULE_ID}.crew-panel.positions.glossary.${id}`

  return {
    ...position,
    actors: position.assigned
      .map(id => game.actors.get(id))
      .filter((actor: Actor | undefined): actor is Actor => actor !== undefined),
    title: localize(`${keyPrefix}.title`),
    description: localize(`${keyPrefix}.desc`),
    sans: localize(`${keyPrefix}.sans`)
  }
}

export default glossPosition
