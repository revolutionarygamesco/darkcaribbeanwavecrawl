import ids from '../ids'

const setBreeze = async (): Promise<void> => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.wind.pointer, y: 1775 }
  ])
}

export default setBreeze
