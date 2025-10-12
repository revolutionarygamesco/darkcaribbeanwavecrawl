import { MODULE_ID } from '../settings.ts'
import describeNauticalTime from './nautical-time.ts'

describe('describeNauticalTime', () => {
  const watches = ['first', 'middle', 'morning', 'forenoon', 'afternoon', 'first dog', 'second dog']
  const hours = [4, 4, 4, 4, 4, 2, 2]
  const scenarios: [string, number, string][] = []
  for (const [index, watch] of watches.entries()) {
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
