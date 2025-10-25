import { MODULE_ID } from '../settings.ts'
import Watch, { allWatches } from '../schedule/watch.ts'
import describeNauticalTime from './nautical-time.ts'

describe('describeNauticalTime', () => {
  const hours = [4, 4, 4, 4, 4, 2, 2]
  const scenarios: [Watch, number, string][] = []
  for (const [index, watch] of allWatches.entries()) {
    const bells = hours[index] === 2 ? 4 : 8
    for (let b = 0; b < bells; b++) {
      const expected = b === 0
        ? `${MODULE_ID}.watches.${watch}`
        : `${MODULE_ID}.watches.${watch}, ${MODULE_ID}.bells.${b}`
      scenarios.push([watch, b, expected])
    }
    scenarios.push([watch, 8, `${MODULE_ID}.watches.${watch}, ${MODULE_ID}.bells.8`])
  }

  it.each(scenarios)('reports %s and %d bells as %s', (watch, bells, expected) => {
    expect(describeNauticalTime(watch, bells)).toBe(expected)
  })
})
