import ids from '../ids'

const setGale = async (): Promise<void> => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.wind.pointer, y: 1848 }
  ])
}

export default setGale
