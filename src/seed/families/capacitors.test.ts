import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'

import { capacitorsFamily, capacitorsValues } from './capacitors'

function classByKey(key: string) {
  const found = capacitorsFamily.classes.find((item) => item.key === key)
  if (!found) throw new Error(`missing class ${key}`)
  return found
}

function valuesInOrder(key: string): string[] {
  const part = classByKey(key)
  return part.fields.map((field) => capacitorsValues[key]?.[field.id] ?? '')
}

function examples(key: string, fieldId: string): string[] {
  const field = classByKey(key).fields.find((item) => item.id === fieldId)
  if (!field) throw new Error(`missing field ${key}.${fieldId}`)
  return field.examples
}

describe('capacitors seed', () => {
  test('CC keeps the six-field prefix and completes with 0.5mm', () => {
    const id = formatId('CC', valuesInOrder('CC'))
    expect(id.startsWith('CC-100nF-10%-0402-50V-X7R-125C')).toBe(true)
    expect(id).toBe('CC-100nF-10%-0402-50V-X7R-125C-0.5mm')
    expect(formatName('CC', classByKey('CC').fields, valuesInOrder('CC'))).toBe(
      'CC 100nF 10% 0402 50V X7R 125C 0.5mm',
    )
    expect(classByKey('CC').fields.map((field) => field.id)).toEqual([
      'capacitance',
      'tolerance',
      'package',
      'voltage',
      'dielectric',
      'temp',
      'thickness',
    ])
    expect(classByKey('CC').fields.at(-1)).toMatchObject({ id: 'thickness', label: 'Thickness' })
  })

  test('unset CC thickness copies as X', () => {
    const values = valuesInOrder('CC')
    expect(classByKey('CC').fields.at(-1)?.id).toBe('thickness')
    values[values.length - 1] = ''
    expect(formatId('CC', values)).toBe('CC-100nF-10%-0402-50V-X7R-125C-X')
  })

  test('appended fields keep the earlier slots', () => {
    expect(formatId('CE', valuesInOrder('CE'))).toBe(
      'CE-100uF-20%-0810-35V-100mR-500mA-105C-AL-2000h',
    )
    expect(classByKey('CE').fields).toHaveLength(9)
    expect(classByKey('CE').fields.map((field) => field.id).slice(0, 8)).toEqual([
      'capacitance',
      'tolerance',
      'package',
      'voltage',
      'esr',
      'ripple',
      'temp',
      'subtype',
    ])
    expect(formatId('CT', valuesInOrder('CT'))).toBe('CT-10uF-10%-B-16V-300mR-MNO2-125C')
    expect(formatId('CF', valuesInOrder('CF'))).toBe('CF-100nF-5%-THT5mm-250V-PP-85C')
    expect(formatId('CS', valuesInOrder('CS'))).toBe('CS-1F-20%-THT10x30-2V5-100mR')
    expect(classByKey('CS').fields.map((field) => field.id)).toEqual([
      'capacitance',
      'tolerance',
      'package',
      'voltage',
      'esr',
    ])
  })

  test('example tokens expand without reordering the old list', () => {
    expect(examples('CC', 'voltage')).toEqual(['10V', '16V', '50V', '100V', '6V3', '25V'])
    expect(examples('CC', 'dielectric')).toEqual(['C0G', 'X7R', 'X5R', 'X7S', 'Y5V', 'X6S', 'NP0'])
    expect(examples('CC', 'thickness')).toEqual(['0.5mm', '0.8mm'])
    expect(examples('CE', 'lifetime')).toEqual(['2000h', '5000h'])
    expect(examples('CS', 'capacitance').slice(0, 4)).toEqual(['1F', '10F', '100F', '470mF'])
    expect(examples('CS', 'capacitance')).toContain('220mF')
    expect(examples('CS', 'capacitance')).toContain('5F')
    expect(examples('CS', 'voltage').slice(0, 3)).toEqual(['2V5', '5V', '5V5'])
    expect(examples('CS', 'voltage')).toEqual(expect.arrayContaining(['2V7', '3V']))
    expect(examples('CS', 'package').slice(0, 2)).toEqual(['1210', 'THT10x30'])
    expect(examples('CS', 'esr').slice(0, 3)).toEqual(['10mR', '100mR', '1R'])
  })
})
