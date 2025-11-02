import type CrawlState from '../../state.ts'
import { setupState } from '../../../utilities/testing/crew.ts'
import foulingSpeedFactor from './fouling.ts'

describe('foulingSpeedFactor', () => {
  let state: CrawlState

  beforeEach(() => {
    state = setupState()
  })

  it.each([
    [1.000, 0],
    [0.909, 10],
    [0.833, 20],
    [0.769, 30],
    [0.714, 40],
    [0.666, 50],
    [0.625, 60],
    [0.588, 70],
    [0.555, 80],
    [0.526, 90],
    [0.500, 100],
    [0.476, 110],
    [0.454, 120],
    [0.434, 130],
    [0.416, 140],
    [0.400, 150],
    [0.384, 160],
    [0.370, 170],
    [0.357, 180],
    [0.344, 190],
    [0.333, 200]
  ] as [number, number][])('reduces speed by %d after %d days of biofouling', async (expected, days) => {
    state.ship.barnacles = days
    expect(await foulingSpeedFactor(state)).toBeCloseTo(expected)
  })
})
