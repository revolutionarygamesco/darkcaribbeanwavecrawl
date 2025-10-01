import ids from '../ids.ts'

const setBloody = async () => {
  await canvas.scene.updateEmbeddedDocuments('Tile', [
    { _id: ids.haunt.normal, alpha: 0 },
    { _id: ids.haunt.bloody, alpha: 1 },
    { _id: ids.haunt.dark, alpha: 0 }
  ])

  await canvas.scene.updateEmbeddedDocuments('AmbientLight', [
    { _id: ids.haunt.light, hidden: true }
  ])
}

export default setBloody
