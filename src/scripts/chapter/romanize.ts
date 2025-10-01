const romanize = (num: number): string => {
  const roman = ['-', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  if (num < 1 || num > 10) return '-'
  return roman[num]
}

export default romanize
