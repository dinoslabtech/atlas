import { describe, expect, test } from 'bun:test'

import { formatId, formatName } from '@/lib/identity'
import { icsFamily, icsValues } from './ics'

describe('ics family', () => {
  const ic = icsFamily.classes[0]!
  const values = ic.fields.map((field) => icsValues.IC?.[field.id] ?? '')

  test('is specified with device, package, pins', () => {
    expect(icsFamily.specified).toBe(true)
    expect(ic.key).toBe('IC')
    expect(ic.name).toBe('Integrated circuit')
    expect(ic.fields.map((field) => field.id)).toEqual(['device', 'package', 'pins'])
    expect(ic.fields.map((field) => field.label)).toEqual(['Device', 'Package', 'Pins'])
  })

  test('default seed is IC LM358 SOIC8 8', () => {
    expect(icsValues.IC).toEqual({ device: 'LM358', package: 'SOIC8', pins: '8' })
    expect(formatId('IC', values)).toBe('IC-LM358-SOIC8-8')
    expect(formatName('IC', ic.fields, values)).toBe('IC LM358 SOIC8 8')
  })

  test('example tokens', () => {
    expect(ic.fields.find((field) => field.id === 'device')?.examples).toEqual([
      'LM358',
      'ATMEGA328P',
      '555',
    ])
    expect(ic.fields.find((field) => field.id === 'package')?.examples).toEqual([
      'SOIC8',
      'QFN32',
      'DIP8',
      'TSSOP14',
    ])
    expect(ic.fields.find((field) => field.id === 'pins')?.examples).toEqual(['8', '14', '32'])
    expect(ic.fields.find((field) => field.id === 'package')?.kind).toBeUndefined()
  })
})
