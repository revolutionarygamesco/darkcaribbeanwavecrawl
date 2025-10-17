import getDate from './get-date.ts'
import setDate from './set-date.ts'

jest.mock('./get-date.ts', () => ({
  __esModule: true,
  default: jest.fn()
}))

describe('setDate', () => {
  const before = new Date(Date.UTC(2025, 9, 12, 15, 25))
  let time: {
    worldTime: number
    set: ReturnType<typeof jest.fn>
  }

  beforeEach(() => {
    time = {
      worldTime: 0,
      set: jest.fn(async (timestamp: number) => {
        time.worldTime = timestamp
      })
    };

    (globalThis as any).game = { time }

    time.worldTime = before.getTime();
    (getDate as jest.Mock).mockReturnValue(before)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set date', async () => {
    await setDate('1715-07-24')
    const expected = new Date(1715, 6, 24, 15, 25).getTime()
    expect(time.worldTime).toBe(expected)
  })

  it('skips invalid date strings', async () => {
    await setDate('lol nope')
    expect(time.worldTime).toBe(before.getTime())
  })
})
