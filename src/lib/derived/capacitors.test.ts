import { describe, expect, test } from 'bun:test'

import { derive } from './capacitors'

function value(rows: { label: string; value: string }[], label: string): string | undefined {
  return rows.find((row) => row.label === label)?.value
}

const cc100n50v = { capacitance: '100nF', voltage: '50V', dielectric: 'X7R' }

describe('derive capacitors', () => {
  test('energy and charge of 100nF 50V', () => {
    const rows = derive(cc100n50v, 25)
    expect(value(rows, 'Energy')).toBe('125uJ')
    expect(value(rows, 'Charge')).toBe('5uC')
  })

  test('C0G and NP0 stay at the 25C value', () => {
    expect(value(derive({ capacitance: '100nF', voltage: '50V', dielectric: 'C0G' }, 125), 'C at ambient')).toBe(
      '100nF',
    )
    expect(value(derive({ capacitance: '100nF', voltage: '50V', dielectric: 'NP0' }, -55), 'C at ambient')).toBe(
      '100nF',
    )
  })

  test('EIA bands interpolate linearly from 25C to the edge', () => {
    expect(value(derive(cc100n50v, 25), 'C at ambient')).toBe('100nF')
    expect(value(derive(cc100n50v, 125), 'C at ambient')).toBe('85nF')
    expect(value(derive(cc100n50v, 75), 'C at ambient')).toBe('92.5nF')
    expect(value(derive({ ...cc100n50v, dielectric: 'X5R' }, 85), 'C at ambient')).toBe('85nF')
    expect(value(derive({ ...cc100n50v, dielectric: 'Y5V' }, 85), 'C at ambient')).toBe('18nF')
    expect(value(derive({ ...cc100n50v, dielectric: 'Y5V' }, -30), 'C at ambient')).toBe('122nF')
  })

  test('X6S uses the EIA X / 105C / S band', () => {
    expect(value(derive({ ...cc100n50v, dielectric: 'X6S' }, 105), 'C at ambient')).toBe('78nF')
  })

  test('voltage infix 6V3 is 6.3 V', () => {
    const rows = derive({ capacitance: '100nF', voltage: '6V3' }, 25)
    expect(value(rows, 'Energy')).toBe('1.98uJ')
    expect(value(rows, 'Charge')).toBe('630nC')
  })

  test('missing C or V omits energy; unknown dielectric omits C at ambient', () => {
    expect(derive({ voltage: '50V', dielectric: 'X7R' }, 25)).toEqual([])
    expect(value(derive({ capacitance: '100nF' }, 25), 'Energy')).toBeUndefined()
    expect(value(derive({ capacitance: '100nF', voltage: '50V' }, 25), 'C at ambient')).toBeUndefined()
  })
})
