import clamp from '../../utilities/clamp.ts'

const describeWinds = (value: number): string => {
  const descriptions = ['Calm', 'Breeze', 'Gale', 'Storm']
  const index = clamp(value, 1, 4) - 1
  return descriptions[index]
}

export default describeWinds
