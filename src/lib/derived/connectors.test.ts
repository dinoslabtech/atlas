import { describe, expect, test } from 'bun:test'

import { derivedConnectors } from './connectors'

const ambientC = 25

describe('derivedConnectors', () => {
  test('header pitch in metres when pins contain a number', () => {
    expect(
      derivedConnectors(
        { type: 'HDR', pins: '1x10', pitch: '2.54mm', orientation: 'VERT', mount: 'PTH' },
        ambientC,
      ),
    ).toEqual([{ label: 'Pitch', value: '0.00254 m' }])
    expect(derivedConnectors({ pins: '2PIN', pitch: '1.27mm' }, ambientC)).toEqual([
      { label: 'Pitch', value: '0.00127 m' },
    ])
    expect(derivedConnectors({ pins: '2x5', pitch: '5.08mm' }, ambientC)).toEqual([
      { label: 'Pitch', value: '0.00508 m' },
    ])
  })

  test('empty when pitch is not millimetres or pins have no number', () => {
    expect(derivedConnectors({ type: 'USBC', pins: 'X', pitch: 'X', orientation: 'X', mount: 'X' }, ambientC)).toEqual(
      [],
    )
    expect(derivedConnectors({ pins: '1x10', pitch: '2.54' }, ambientC)).toEqual([])
    expect(derivedConnectors({ pins: 'X', pitch: '2.54mm' }, ambientC)).toEqual([])
    expect(derivedConnectors({ pins: '1x10' }, ambientC)).toEqual([])
    expect(derivedConnectors({}, ambientC)).toEqual([])
  })
})
