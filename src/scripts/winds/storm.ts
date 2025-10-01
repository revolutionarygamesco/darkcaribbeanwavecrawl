import ids from '../ids'

const setStorm = async (): Promise<void> => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.wind.pointer, y: 1920 }
  ])
}

export default setStorm
