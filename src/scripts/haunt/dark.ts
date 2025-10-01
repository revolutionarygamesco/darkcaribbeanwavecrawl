import ids from '../ids.ts'

const setDark = async () => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.haunt.normal, alpha: 0 },
    { _id: ids.haunt.bloody, alpha: 0 },
    { _id: ids.haunt.dark, alpha: 1 }
  ])

  await canvas.scene.updateEmbeddedDocuments('AmbientLight', [
    { _id: ids.haunt.light, hidden: false }
  ])
}

export default setDark
