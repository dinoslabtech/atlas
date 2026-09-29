import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'
import { seedFamilies, seedValues } from './taxonomy'
import { CHIP_EIA } from './packages'

function classByKey(key: string) {
  for (const family of seedFamilies) {
    const found = family.classes.find((item) => item.key === key)
    if (found) return { family, class: found }
  }
  throw new Error(`missing class ${key}`)
}

function valuesInOrder(key: string): string[] {
  const { class: part } = classByKey(key)
  return part.fields.map((field) => seedValues[key]?.[field.id] ?? '')
}

describe('seed taxonomy', () => {
  test('includes every planned class', () => {
    const keys = seedFamilies.flatMap((family) => family.classes.map((item) => item.key))
    expect(keys).toEqual([
      'RR',
      'RX',
      'RW',
      'RS',
      'RN',
      'CC',
      'CE',
      'CT',
      'CF',
      'CS',
      'LL',
      'LP',
      'LR',
      'LC',
      'FB',
      'DD',
      'DS',
      'DZ',
      'DL',
      'QN',
      'QP',
      'MN',
      'MP',
      'IC',
      'JJ',
    ])
  })

  test('seeded examples keep documented ID prefixes', () => {
    expect(formatId('RR', valuesInOrder('RR'))).toMatch(/^RR-10k-1%-0402/)
    expect(formatId('RX', valuesInOrder('RX'))).toMatch(/^RX-10k-1%-0402-100mW-100ppm-TK/)
    expect(formatId('CC', valuesInOrder('CC'))).toMatch(/^CC-100nF-10%-0402-50V-X7R/)
    expect(formatId('LL', valuesInOrder('LL'))).toMatch(/^LL-100nH-5%-0402-500MHz-SH/)
    expect(formatName('LL', classByKey('LL').class.fields, valuesInOrder('LL'))).toMatch(
      /^LL 100nH±5% 0402 500MHz SH/,
    )
    expect(formatId('FB', valuesInOrder('FB'))).toMatch(/^FB-600R@100MHz-0402-500mA-200mR/)
    expect(formatId('DD', valuesInOrder('DD'))).toMatch(/^DD-150mA-SOD123-100V/)
    expect(formatId('DZ', valuesInOrder('DZ'))).toMatch(/^DZ-12V-SOD323-500mW/)
    expect(formatId('QN', valuesInOrder('QN'))).toMatch(/^QN-200mA-SOT23-40V/)
    expect(formatId('CE', valuesInOrder('CE'))).toMatch(/^CE-100uF-20%-0810-35V-100mR-500mA-105C-AL/)
  })

  test('CE and LP are not chip-package drawings', () => {
    expect(classByKey('CE').class.fields.find((field) => field.id === 'package')?.kind).not.toBe(
      'chip-package',
    )
    expect(classByKey('LP').class.fields.find((field) => field.id === 'package')?.kind).not.toBe(
      'chip-package',
    )
    expect(classByKey('DD').class.fields.find((field) => field.id === 'package')?.kind).not.toBe(
      'chip-package',
    )
    expect(classByKey('QN').class.fields.find((field) => field.id === 'package')?.kind).not.toBe(
      'chip-package',
    )
  })

  test('DL package includes an EIA chip code from the draw list', () => {
    const pkg = classByKey('DL').class.fields.find((field) => field.id === 'package')
    expect(pkg?.kind).toBe('chip-package')
    expect(pkg?.examples.some((example) => CHIP_EIA.has(example))).toBe(true)
  })
})
