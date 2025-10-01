import getChapter from './get.ts'
import setChapter from './set.ts'

const revertChapter = async (): Promise<void> => {
  const curr = getChapter() ?? 1
  await setChapter(curr - 1)
}

export default revertChapter
