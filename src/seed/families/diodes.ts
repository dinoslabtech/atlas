import type { ExampleValues, Family } from '../types'
import { chip, field, partClass } from '../build'

export const diodesFamily: Family = {
  id: 'diodes',
  name: 'Diodes',
  specified: true,
  classes: [
    partClass('DD', 'Standard diode', [
      field('current', 'Current', ['150mA', '1A']),
      field('package', 'Package', ['SOD123', 'SOD323', 'SMA']),
      field('voltage', 'Voltage', ['100V', '40V', '12V']),
      field('vf', 'Vf', ['0V7', '1V1']),
    ]),
    partClass('DS', 'Schottky', [
      field('current', 'Current', ['150mA', '1A']),
      field('package', 'Package', ['SMA', 'SOD123', 'SOD323']),
      field('voltage', 'Voltage', ['40V', '100V']),
      field('vf', 'Vf', ['0V3', '0V45']),
    ]),
    partClass('DZ', 'Zener', [
      field('voltage', 'Voltage', ['12V', '40V', '100V']),
      field('package', 'Package', ['SOD323', 'SOD123']),
      field('power', 'Power', ['500mW']),
      field('ztol', 'Tolerance', ['2%', '5%']),
    ]),
    partClass('DL', 'LED', [
      field('color', 'Color', ['RED', 'BLUE', 'GREEN', 'YELLOW', 'WHITE']),
      field('package', 'Package', ['0603', 'PTH-3mm'], chip),
      field('current', 'Current', ['20mA']),
      field('vf', 'Vf', ['2V0', '3V3']),
      field('lens', 'Lens', ['DIFF', 'CLR']),
    ]),
  ],
}

export const diodesValues: ExampleValues = {
  DD: { current: '150mA', package: 'SOD123', voltage: '100V', vf: '0V7' },
  DS: { current: '1A', package: 'SMA', voltage: '40V', vf: '0V3' },
  DZ: { voltage: '12V', package: 'SOD323', power: '500mW', ztol: '5%' },
  DL: { color: 'RED', package: '0603', current: '20mA', vf: '2V0' },
}
