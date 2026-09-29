import type { ExampleValues, Family } from '../types'
import { field, partClass } from '../build'

export const icsFamily: Family = {
  id: 'ics',
  name: 'ICs',
  specified: true,
  classes: [
    partClass('IC', 'Integrated circuit', [
      field('device', 'Device', ['LM358', 'ATMEGA328P', '555']),
      field('package', 'Package', ['SOIC8', 'QFN32', 'DIP8', 'TSSOP14']),
      field('pins', 'Pins', ['8', '14', '32']),
    ]),
  ],
}

export const icsValues: ExampleValues = {
  IC: { device: 'LM358', package: 'SOIC8', pins: '8' },
}
