import type { ExampleValues, Family } from '../types'
import { field, partClass } from '../build'

export const transistorsFamily: Family = {
  id: 'transistors',
  name: 'Transistors',
  specified: true,
  classes: [
    partClass('QN', 'BJT NPN', [
      field('current', 'Current', ['200mA', '1A', '3A']),
      field('package', 'Package', ['SOT23', 'PTH-TO92']),
      field('voltage', 'Voltage', ['40V', '30V', '60V']),
      field('hfe', 'hFE', ['100', '300']),
      field('power', 'Power', ['250mW', '1W']),
    ]),
    partClass('QP', 'BJT PNP', [
      field('current', 'Current', ['200mA', '1A', '3A']),
      field('package', 'Package', ['SOT23', 'PTH-TO92']),
      field('voltage', 'Voltage', ['40V', '30V', '60V']),
      field('hfe', 'hFE', ['100', '300']),
      field('power', 'Power', ['250mW', '1W']),
    ]),
    partClass('MN', 'MOSFET N-channel', [
      field('current', 'Current', ['3A', '200mA', '1A']),
      field('package', 'Package', ['SOT23', 'PTH-TO92']),
      field('voltage', 'Voltage', ['30V', '40V', '60V']),
      field('rds', 'Rds', ['20mR', '100mR']),
      field('vgs', 'Vgs', ['2V5', '4V5']),
    ]),
    partClass('MP', 'MOSFET P-channel', [
      field('current', 'Current', ['3A', '200mA', '1A']),
      field('package', 'Package', ['SOT23', 'PTH-TO92']),
      field('voltage', 'Voltage', ['30V', '40V', '60V']),
      field('rds', 'Rds', ['20mR', '100mR']),
      field('vgs', 'Vgs', ['2V5', '4V5']),
    ]),
  ],
}

export const transistorsValues: ExampleValues = {
  QN: { current: '200mA', package: 'SOT23', voltage: '40V', hfe: '100', power: '250mW' },
  QP: { current: '200mA', package: 'SOT23', voltage: '40V', hfe: '100', power: '250mW' },
  MN: { current: '3A', package: 'SOT23', voltage: '30V', rds: '20mR', vgs: '2V5' },
  MP: { current: '3A', package: 'SOT23', voltage: '30V', rds: '20mR', vgs: '2V5' },
}
