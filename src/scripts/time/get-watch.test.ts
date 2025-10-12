import getWatch from './get-watch.ts'

describe('getWatch', () => {
  const formatTime = (h: number, m: number): string => {
    return `${h.toString().padStart(2, '0')}${m.toString().padStart(2, '0')}`
  }

  const minutes: number[] = []
  for (let i = 0; i < 24; i++) minutes.push(Math.floor(Math.random() * 59 + 1))

  it.each([
    ['middle', formatTime(0, minutes[0]), 0, minutes[0]],
    ['middle', formatTime(1, minutes[1]), 1, minutes[1]],
    ['middle', formatTime(2, minutes[2]), 2, minutes[2]],
    ['middle', formatTime(3, minutes[3]), 3, minutes[3]],
    ['morning', formatTime(4, minutes[4]), 4, minutes[4]],
    ['morning', formatTime(5, minutes[5]), 5, minutes[5]],
    ['morning', formatTime(6, minutes[6]), 6, minutes[6]],
    ['morning', formatTime(7, minutes[7]), 7, minutes[7]],
    ['forenoon', formatTime(8, minutes[8]), 8, minutes[8]],
    ['forenoon', formatTime(9, minutes[9]), 9, minutes[9]],
    ['forenoon', formatTime(10, minutes[10]), 10, minutes[10]],
    ['forenoon', formatTime(11, minutes[11]), 11, minutes[11]],
    ['afternoon', formatTime(12, minutes[12]), 12, minutes[12]],
    ['afternoon', formatTime(13, minutes[13]), 13, minutes[13]],
    ['afternoon', formatTime(14, minutes[14]), 14, minutes[14]],
    ['afternoon', formatTime(15, minutes[15]), 15, minutes[15]],
    ['first dog', formatTime(16, minutes[16]), 16, minutes[16]],
    ['first dog', formatTime(17, minutes[17]), 17, minutes[17]],
    ['second dog', formatTime(18, minutes[18]), 18, minutes[18]],
    ['second dog', formatTime(19, minutes[19]), 19, minutes[19]],
    ['first', formatTime(20, minutes[20]), 20, minutes[20]],
    ['first', formatTime(21, minutes[21]), 21, minutes[21]],
    ['first', formatTime(22, minutes[22]), 22, minutes[22]],
    ['first', formatTime(23, minutes[23]), 23, minutes[23]],
  ] as [string, string, number, number][])('returns %s for %s', (expected, _, h, m) => {
    expect(getWatch(h, m)).toBe(expected)
  })

  it.each([
    ['first', 0],
    ['middle', 4],
    ['morning', 8],
    ['forenoon', 12],
    ['afternoon', 16],
    ['first dog', 18],
    ['second dog', 20]
  ] as [string, number][])('returns %s at the end of the watch', (expected, h) => {
    expect(getWatch(h, 0)).toBe(expected)
  })
})
