import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'
import { chip, plusMinus } from '../build'
import { inductorsFamily, inductorsValues } from './inductors'

function classByKey(key: string) {
  const found = inductorsFamily.classes.find((item) => item.key === key)
  if (!found) throw new Error(`missing class ${key}`)
  return found
}

function valuesInOrder(key: string): string[] {
  const part = classByKey(key)
  return part.fields.map((field) => inductorsValues[key]?.[field.id] ?? '')
}

describe('inductors seed', () => {
  test('existing LL and FB IDs are unchanged', () => {
    expect(formatId('LL', valuesInOrder('LL'))).toBe('LL-100nH-5%-0402-500MHz-SH')
    expect(formatName('LL', classByKey('LL').fields, valuesInOrder('LL'))).toBe(
      'LL 100nH±5% 0402 500MHz SH',
    )
    expect(formatId('FB', valuesInOrder('FB'))).toBe('FB-600R@100MHz-0402-500mA-200mR')
    expect(formatName('FB', classByKey('FB').fields, valuesInOrder('FB'))).toBe(
      'FB 600R@100MHz 0402 500mA 200mR',
    )
  })

  test('LP LR LC specimens keep their IDs', () => {
    expect(formatId('LP', valuesInOrder('LP'))).toBe('LP-4u7-20%-5020-3A-2A-80mR-SH')
    expect(formatName('LP', classByKey('LP').fields, valuesInOrder('LP'))).toBe(
      'LP 4u7±20% 5020 3A 2A 80mR SH',
    )
    expect(formatId('LR', valuesInOrder('LR'))).toBe('LR-2n2-2%-0402-2G4-Q50')
    expect(formatId('LC', valuesInOrder('LC'))).toBe('LC-4m7-20%-3216-600R@100MHz-500mA-500mR-2L')
  })

  test('field order is unchanged and omits Q on LL and core on LP', () => {
    expect(classByKey('LL').fields.map((field) => field.id)).toEqual([
      'inductance',
      'tolerance',
      'package',
      'srf',
      'shield',
    ])
    expect(classByKey('LP').fields.map((field) => field.id)).toEqual([
      'inductance',
      'tolerance',
      'package',
      'isat',
      'irms',
      'dcr',
      'shield',
    ])
    expect(classByKey('LR').fields.map((field) => field.id)).toEqual([
      'inductance',
      'tolerance',
      'package',
      'srf',
      'q',
    ])
    expect(classByKey('LC').fields.map((field) => field.id)).toEqual([
      'inductance',
      'tolerance',
      'package',
      'zcm',
      'irated',
      'dcr',
      'lines',
    ])
    expect(classByKey('FB').fields.map((field) => field.id)).toEqual([
      'zimp',
      'package',
      'irated',
      'dcr',
    ])
  })

  test('tolerance keeps plusMinus kind', () => {
    for (const key of ['LL', 'LP', 'LR', 'LC']) {
      expect(classByKey(key).fields.find((field) => field.id === 'tolerance')?.kind).toBe(plusMinus)
    }
    expect(classByKey('FB').fields.find((field) => field.id === 'tolerance')).toBeUndefined()
  })

  test('EIA chip classes keep chip-package kind; LP does not', () => {
    expect(classByKey('LL').fields.find((field) => field.id === 'package')?.kind).toBe(chip)
    expect(classByKey('LR').fields.find((field) => field.id === 'package')?.kind).toBe(chip)
    expect(classByKey('LC').fields.find((field) => field.id === 'package')?.kind).toBe(chip)
    expect(classByKey('FB').fields.find((field) => field.id === 'package')?.kind).toBe(chip)
    expect(classByKey('LP').fields.find((field) => field.id === 'package')?.kind).not.toBe(chip)
  })

  test('example tokens expand EIA, current, DCR, SRF, and FB Z', () => {
    const ll = classByKey('LL')
    const lp = classByKey('LP')
    const lr = classByKey('LR')
    const fb = classByKey('FB')
    expect(ll.fields.find((field) => field.id === 'package')?.examples).toEqual(
      expect.arrayContaining(['01005', '0201', '0402', '1210', '1808', '1812']),
    )
    expect(ll.fields.find((field) => field.id === 'srf')?.examples).toEqual(
      expect.arrayContaining(['50MHz', '100MHz', '200MHz', '1G0', '1G5']),
    )
    expect(lp.fields.find((field) => field.id === 'isat')?.examples).toEqual(
      expect.arrayContaining(['500mA', '1A', '3A', '5A', '10A', '15A']),
    )
    expect(lp.fields.find((field) => field.id === 'irms')?.examples).toEqual(
      expect.arrayContaining(['500mA', '800mA', '1A', '2A', '4A', '8A']),
    )
    expect(lp.fields.find((field) => field.id === 'dcr')?.examples).toEqual(
      expect.arrayContaining(['10mR', '20mR', '50mR', '80mR', '1R2']),
    )
    expect(lr.fields.find((field) => field.id === 'srf')?.examples).toEqual(
      expect.arrayContaining(['500MHz', '2G4', '3GHz', '6GHz', '10GHz']),
    )
    expect(fb.fields.find((field) => field.id === 'zimp')?.examples).toEqual(
      expect.arrayContaining(['120R@100MHz', '1kR@100MHz', '600R@100MHz']),
    )
    expect(fb.fields.find((field) => field.id === 'package')?.examples).toEqual(
      expect.arrayContaining(['01005', '0402', '1210']),
    )
  })
})
