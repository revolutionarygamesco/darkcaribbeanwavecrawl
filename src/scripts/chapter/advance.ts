import getChapter from './get.ts'
import setChapter from './set.ts'

const advanceChapter = async (): Promise<void> => {
  const curr = getChapter() ?? 1
  await setChapter(curr + 1)
}

export default advanceChapter
