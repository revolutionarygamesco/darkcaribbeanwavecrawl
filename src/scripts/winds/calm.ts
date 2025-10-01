import ids from '../ids'

const setCalm = async (): Promise<void> => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.wind.pointer, y: 1703 }
  ])
}

export default setCalm
