import { VotingSize } from './types.ts'
import findScene from './find-scene.ts'
import listRegions from '../utilities/list-regions.ts'
import ids from '../ids.ts'

const updateCount = async (
  scene: Scene,
  size: VotingSize,
  field: 'yea' | 'undecided' | 'nay',
  count: number
): Promise<void> => {
  const text = scene.drawings.get(ids.voting[size][field])
  if (!text) return
  await text.update({ text: count.toString() })
}

const countVotes = async (
  scene: string = foundry.documents.Scene.active.id
): Promise<void> => {
  const size = findScene(scene)
  if (!size) return

  const votingScene = game.scenes.get(scene) as Scene
  if (!votingScene) return

  const count = { y: 0, u: 0, n: 0 }
  const tokens = Array.from(votingScene.tokens.values())
  for (const token of tokens) {
    const regions = listRegions(token)
    if (regions.includes('Yea')) count.y++
    if (regions.includes('Undecided')) count.u++
    if (regions.includes('Nay')) count.n++
  }

  await updateCount(votingScene, size, 'yea', count.y)
  await updateCount(votingScene, size, 'undecided', count.u)
  await updateCount(votingScene, size, 'nay', count.n)
}

export default countVotes
