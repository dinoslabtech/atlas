import { describe, expect, test } from 'bun:test'

import { formatId, formatName, identity } from './identity'

const token = { kind: 'token' as const }
const plusMinus = { kind: 'tolerance-plusminus' as const }
const chip = { kind: 'chip-package' as const }

describe('identity', () => {
  test('RR specimen', () => {
    const fields = [token, token, chip]
    const values = ['10k', '1%', '0402']
    expect(identity('RR', fields, values)).toEqual({
      key: 'RR',
      id: 'RR-10k-1%-0402',
      name: 'RR 10k 1% 0402',
    })
  })

  test('RX specimen', () => {
    const fields = [token, token, chip, token, token, token]
    const values = ['10k', '1%', '0402', '100mW', '100ppm', 'TK']
    expect(formatId('RX', values)).toBe('RX-10k-1%-0402-100mW-100ppm-TK')
    expect(formatName('RX', fields, values)).toBe('RX 10k 1% 0402 100mW 100ppm TK')
  })

  test('CC specimen', () => {
    const values = ['100nF', '10%', '0402', '50V', 'X7R']
    expect(formatId('CC', values)).toBe('CC-100nF-10%-0402-50V-X7R')
    expect(formatName('CC', [token, token, chip, token, token], values)).toBe(
      'CC 100nF 10% 0402 50V X7R',
    )
  })

  test('LL specimen glues ±tolerance', () => {
    const fields = [token, plusMinus, chip, token, token]
    const values = ['100nH', '5%', '0402', '500MHz', 'SH']
    expect(formatId('LL', values)).toBe('LL-100nH-5%-0402-500MHz-SH')
    expect(formatName('LL', fields, values)).toBe('LL 100nH±5% 0402 500MHz SH')
  })

  test('FB specimen has no tolerance glue', () => {
    const values = ['600R@100MHz', '0402', '500mA', '200mR']
    expect(formatId('FB', values)).toBe('FB-600R@100MHz-0402-500mA-200mR')
    expect(formatName('FB', [token, chip, token, token], values)).toBe(
      'FB 600R@100MHz 0402 500mA 200mR',
    )
  })

  test('empty fields stay as X in position', () => {
    const fields = [token, token, chip]
    const values = ['', '', '']
    expect(formatId('RR', values)).toBe('RR-X-X-X')
    expect(formatName('RR', fields, values)).toBe('RR X X X')
  })

  test('a missing middle field keeps its dash slot', () => {
    expect(formatId('RR', ['10k', '', '0402'])).toBe('RR-10k-X-0402')
  })

  test('class with no fields is the Key alone', () => {
    expect(identity('IC', [], [])).toEqual({ key: 'IC', id: 'IC', name: 'IC' })
  })

  test('diode and transistor specimens', () => {
    expect(formatId('DD', ['150mA', 'SOD123', '100V'])).toBe('DD-150mA-SOD123-100V')
    expect(formatName('DD', [token, token, token], ['150mA', 'SOD123', '100V'])).toBe(
      'DD 150mA SOD123 100V',
    )
    expect(formatId('DS', ['1A', 'SMA', '40V'])).toBe('DS-1A-SMA-40V')
    expect(formatId('DZ', ['12V', 'SOD323', '500mW'])).toBe('DZ-12V-SOD323-500mW')
    expect(formatName('DL', [token, chip], ['RED', '0603'])).toBe('DL RED 0603')
    expect(formatName('DL', [token, chip], ['BLUE', 'PTH-3mm'])).toBe('DL BLUE PTH-3mm')
    expect(formatId('QN', ['200mA', 'SOT23', '40V'])).toBe('QN-200mA-SOT23-40V')
    expect(formatId('QN', ['1A', 'PTH-TO92', '60V'])).toBe('QN-1A-PTH-TO92-60V')
    expect(formatId('MN', ['3A', 'SOT23', '30V'])).toBe('MN-3A-SOT23-30V')
  })

  test('passive worked examples', () => {
    expect(formatId('RW', ['10R', '1%', '0805', '500mW', '50ppm', 'NI'])).toBe(
      'RW-10R-1%-0805-500mW-50ppm-NI',
    )
    expect(formatId('RS', ['10mR', '1%', '2512', '2W', '75ppm', '4T'])).toBe(
      'RS-10mR-1%-2512-2W-75ppm-4T',
    )
    expect(formatId('RN', ['10k', '1%', '0402x4', '63mW', '4', 'ISO'])).toBe(
      'RN-10k-1%-0402x4-63mW-4-ISO',
    )
    expect(formatId('CE', ['100uF', '20%', '0810', '35V', '100mR', '500mA', '105C', 'AL'])).toBe(
      'CE-100uF-20%-0810-35V-100mR-500mA-105C-AL',
    )
    expect(formatId('CT', ['10uF', '10%', 'B', '16V', '300mR', 'MNO2'])).toBe(
      'CT-10uF-10%-B-16V-300mR-MNO2',
    )
    expect(formatId('CF', ['100nF', '5%', 'THT5mm', '250V', 'PP'])).toBe(
      'CF-100nF-5%-THT5mm-250V-PP',
    )
    expect(formatId('CS', ['1F', '20%', 'THT10x30', '2V5', '100mR'])).toBe(
      'CS-1F-20%-THT10x30-2V5-100mR',
    )
    expect(formatName('LP', [token, plusMinus, token, token, token, token, token], [
      '4u7',
      '20%',
      '5020',
      '3A',
      '2A',
      '80mR',
      'SH',
    ])).toBe('LP 4u7±20% 5020 3A 2A 80mR SH')
    expect(formatName('LR', [token, plusMinus, chip, token, token], [
      '2n2',
      '2%',
      '0402',
      '2G4',
      'Q50',
    ])).toBe('LR 2n2±2% 0402 2G4 Q50')
    expect(formatId('LC', ['4m7', '20%', '3216', '600R@100MHz', '500mA', '500mR', '2L'])).toBe(
      'LC-4m7-20%-3216-600R@100MHz-500mA-500mR-2L',
    )
  })

  test('reordering fields recomputes ID and Name', () => {
    const fields = [chip, token, token]
    const values = ['0402', '10k', '1%']
    expect(formatId('RR', values)).toBe('RR-0402-10k-1%')
    expect(formatName('RR', fields, values)).toBe('RR 0402 10k 1%')
  })
})
