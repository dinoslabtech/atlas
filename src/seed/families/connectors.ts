import type { ExampleValues, Family } from '../types'
import { field, partClass } from '../build'

export const connectorsFamily: Family = {
  id: 'connectors',
  name: 'Connectors',
  specified: true,
  classes: [
    partClass('JJ', 'Connector', [
      field('type', 'Type', ['HDR', 'USBC', 'RJ45', 'TB']),
      field('pins', 'Pins', ['1x10', '1x8', '2x5', '2PIN']),
      field('pitch', 'Pitch', ['2.54mm', '1.27mm', '5.08mm']),
      field('orientation', 'Orientation', ['VERT', 'RA']),
      field('mount', 'Mount', ['PTH', 'SMD']),
    ]),
  ],
}

export const connectorsValues: ExampleValues = {
  JJ: { type: 'HDR', pins: '1x10', pitch: '2.54mm', orientation: 'VERT', mount: 'PTH' },
}
