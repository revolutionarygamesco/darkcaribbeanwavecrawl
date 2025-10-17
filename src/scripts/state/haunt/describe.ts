import clamp from '../../utilities/clamp.ts'

const describeHaunt = (value: number): string => {
  const descriptions = ['Normal', 'Bloody', 'Dark']
  const index = clamp(value, 1, 3) - 1
  return descriptions[index]
}

export default describeHaunt
