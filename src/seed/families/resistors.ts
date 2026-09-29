import type { ExampleValues, Family } from '../types'
import { chip, field, partClass } from '../build'

export const resistorsFamily: Family = {
  id: 'resistors',
  name: 'Resistors',
  group: 'Passives',
  specified: true,
  classes: [
    partClass('RR', 'Thick film / thin film SMD chip', [
      field('resistance', 'Resistance', ['100R', '4R7', '10k', '1M', '0R']),
      field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%', '10%']),
      field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '1210', '2010', '2512'], chip),
      field('power', 'Power', ['63mW', '100mW', '125mW', '250mW', '500mW', '1W']),
      field('voltage', 'Voltage', ['25V', '50V', '75V', '100V', '150V', '200V']),
    ]),
    partClass('RX', 'Thick film / thin film SMD chip (full)', [
      field('resistance', 'Resistance', ['100R', '4R7', '10k', '1M', '0R']),
      field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%', '10%']),
      field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '2512'], chip),
      field('power', 'Power', ['63mW', '100mW', '125mW', '250mW', '500mW', '1W']),
      field('tcr', 'TCR', ['10ppm', '25ppm', '100ppm', '200ppm']),
      field('tech', 'Tech', ['TK', 'TN']),
      field('voltage', 'Voltage', ['25V', '50V', '75V', '100V', '150V', '200V']),
    ]),
    partClass('RW', 'Wirewound SMD', [
      field('resistance', 'Resistance', ['1R0', '10R', '100R']),
      field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%']),
      field('package', 'Package', ['0402', '0603', '0805', '1206', '2512'], chip),
      field('power', 'Power', ['250mW', '500mW', '1W', '2W']),
      field('tcr', 'TCR', ['10ppm', '20ppm', '50ppm', '100ppm']),
      field('winding', 'Winding', ['STD', 'NI']),
      field('voltage', 'Voltage', ['25V', '50V', '75V', '100V', '150V', '200V']),
    ]),
    partClass('RS', 'Shunt / current sense', [
      field('resistance', 'Resistance', ['1mR', '5mR', '10mR', '50mR', '100mR', '1R0']),
      field('tolerance', 'Tolerance', ['0.5%', '1%', '5%']),
      field('package', 'Package', ['1206', '2010', '2512', '3920', '5930'], chip),
      field('power', 'Power', ['1W', '2W', '3W', '5W']),
      field('tcr', 'TCR', ['10ppm', '50ppm', '75ppm', '100ppm']),
      field('term', 'Termination', ['2T', '4T']),
      field('voltage', 'Voltage', ['25V', '50V', '75V', '100V', '150V', '200V']),
    ]),
    partClass('RN', 'Resistor network / array', [
      field('resistance', 'Resistance', ['10k', '100R', '4k7']),
      field('tolerance', 'Tolerance', ['1%', '2%', '5%']),
      field('package', 'Package', ['0402x4', '0603x4', '1206x8', 'SOP8']),
      field('power', 'Power', ['63mW', '100mW']),
      field('count', 'Count', ['4', '8']),
      field('config', 'Configuration', ['ISO', 'BUS']),
      field('tcr', 'TCR', ['10ppm', '25ppm', '50ppm', '100ppm', '200ppm']),
    ]),
  ],
}

export const resistorsValues: ExampleValues = {
  RR: { resistance: '10k', tolerance: '1%', package: '0402', power: '63mW', voltage: '50V' },
  RX: {
    resistance: '10k',
    tolerance: '1%',
    package: '0402',
    power: '100mW',
    tcr: '100ppm',
    tech: 'TK',
    voltage: '50V',
  },
  RW: {
    resistance: '10R',
    tolerance: '1%',
    package: '0805',
    power: '500mW',
    tcr: '50ppm',
    winding: 'NI',
    voltage: '50V',
  },
  RS: {
    resistance: '10mR',
    tolerance: '1%',
    package: '2512',
    power: '2W',
    tcr: '75ppm',
    term: '4T',
    voltage: '50V',
  },
  RN: {
    resistance: '10k',
    tolerance: '1%',
    package: '0402x4',
    power: '63mW',
    count: '4',
    config: 'ISO',
    tcr: '100ppm',
  },
}
