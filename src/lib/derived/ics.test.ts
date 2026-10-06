import { describe, expect, test } from 'bun:test'

import { icsDerived } from './ics'

describe('ics derived', () => {
  test('numeric pins show pin count', () => {
    expect(icsDerived({ pins: '8' }, 25)).toEqual([{ label: 'Pin count', value: '8' }])
    expect(icsDerived({ pins: '14' }, 25)).toEqual([{ label: 'Pin count', value: '14' }])
    expect(icsDerived({ pins: '32' }, 25)).toEqual([{ label: 'Pin count', value: '32' }])
  })

  test('non-numeric pins are empty', () => {
    expect(icsDerived({}, 25)).toEqual([])
    expect(icsDerived({ pins: '' }, 25)).toEqual([])
    expect(icsDerived({ pins: 'X' }, 25)).toEqual([])
    expect(icsDerived({ pins: 'SOIC8' }, 25)).toEqual([])
  })
})
