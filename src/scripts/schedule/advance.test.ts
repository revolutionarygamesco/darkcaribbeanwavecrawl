import initCrawlState from '../state/init.ts'
import changeWatch from './change.ts'
import advanceTime from './advance.ts'

jest.mock('./change.ts')

describe('advanceTime', () => {
  const changeMock = changeWatch as jest.MockedFunction<typeof changeWatch>

  beforeEach(() => {
    changeMock.mockResolvedValue(initCrawlState())
  })

  afterEach(() => {
    changeMock.mockClear()
  })

  it('calls nothing if nothing happened', async () => {
    const before = new Date(Date.UTC(1715, 6, 15, 14, 0))
    const after = new Date(Date.UTC(1715, 6, 15, 14, 20))
    await advanceTime(before, after)
    expect(changeMock).toHaveBeenCalledTimes(0)
  })

  it('catches a watch shift change', async () => {
    const before = new Date(Date.UTC(1715, 6, 15, 7, 50))
    const after = new Date(Date.UTC(1715, 6, 15, 8, 10))
    await advanceTime(before, after)
    expect(changeMock).toHaveBeenCalledTimes(1)
    expect(changeMock.mock.calls[0][0]).toBe('morning')
  })

  it('catches multiple watch shift changes', async () => {
    const before = new Date(Date.UTC(1715, 6, 15, 7, 50))
    const after = new Date(Date.UTC(1715, 6, 15, 13, 10))
    await advanceTime(before, after)
    expect(changeMock).toHaveBeenCalledTimes(2)
    expect(changeMock.mock.calls[0][0]).toBe('morning')
    expect(changeMock.mock.calls[1][0]).toBe('forenoon')
  })

  it('catches watch shift changes over multiple days', async () => {
    const before = new Date(Date.UTC(1715, 6, 15, 7, 30))
    const after = new Date(Date.UTC(1715, 6, 16, 7, 30))
    await advanceTime(before, after)
    expect(changeMock).toHaveBeenCalledTimes(7)
    expect(changeMock.mock.calls[0][0]).toBe('morning')
    expect(changeMock.mock.calls[1][0]).toBe('forenoon')
    expect(changeMock.mock.calls[2][0]).toBe('afternoon')
    expect(changeMock.mock.calls[3][0]).toBe('first dog')
    expect(changeMock.mock.calls[4][0]).toBe('second dog')
    expect(changeMock.mock.calls[5][0]).toBe('first')
    expect(changeMock.mock.calls[6][0]).toBe('middle')
  })
})
