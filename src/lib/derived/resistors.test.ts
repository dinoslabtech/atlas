import { describe, expect, test } from 'bun:test'

import { derive } from './resistors'

describe('resistors derive', () => {
  test('10k 63mW 50V at 25C', () => {
    expect(derive({ resistance: '10k', power: '63mW', voltage: '50V' }, 25)).toEqual([
      { label: 'Rated current', value: '2.51mA' },
      { label: 'Voltage from power', value: '25.1V' },
      { label: 'Rated voltage', value: '25.1V' },
    ])
  })

  test('skips a row when required tokens do not parse', () => {
    expect(derive({ resistance: '10k', voltage: '50V' }, 25)).toEqual([])
    expect(derive({ power: '63mW', voltage: '50V' }, 25)).toEqual([])
    expect(derive({ resistance: 'X', power: '63mW' }, 25)).toEqual([])
  })

  test('rated voltage is the lesser of Vmax and sqrt(P*R)', () => {
    const rows = derive({ resistance: '10k', power: '1W', voltage: '50V' }, 25)
    expect(rows).toContainEqual({ label: 'Voltage from power', value: '100V' })
    expect(rows).toContainEqual({ label: 'Rated voltage', value: '50V' })
    expect(rows).toContainEqual({ label: 'Rated current', value: '10mA' })
  })

  test('power derates above 70C toward zero at 155C', () => {
    expect(derive({ resistance: '10k', power: '63mW' }, 70)).not.toContainEqual(
      expect.objectContaining({ label: 'Derated power' }),
    )
    expect(derive({ resistance: '10k', power: '63mW' }, 100)).toContainEqual({
      label: 'Derated power',
      value: '40.8mW',
    })
  })

  test('TCR shifts resistance with ambient', () => {
    expect(derive({ resistance: '10k', tcr: '100ppm' }, 25)).toEqual([
      { label: 'Resistance at ambient', value: '10kR' },
    ])
    expect(derive({ resistance: '10k', tcr: '100ppm' }, 125)).toEqual([
      { label: 'Resistance at ambient', value: '10.1kR' },
    ])
  })
})
