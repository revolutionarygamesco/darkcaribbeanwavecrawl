import romanize from './romanize.ts'

const getTitle = (num: number): string => {
  return `Chapter ${romanize(num)}.`
}

export default getTitle
