import type { ExampleValues, Family } from '../types'
import { chip, field, partClass, plusMinus } from '../build'

export const inductorsFamily: Family = {
  id: 'inductors',
  name: 'Inductors',
  group: 'Passives',
  specified: true,
  classes: [
    partClass('LL', 'Signal / general purpose SMD chip inductor', [
      field('inductance', 'Inductance', ['100nH', '1uH', '4u7', '10uH']),
      field('tolerance', 'Tolerance', ['1%', '2%', '5%', '10%'], plusMinus),
      field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '1210', '1808', '1812'], chip),
      field('srf', 'SRF', ['50MHz', '100MHz', '200MHz', '500MHz', '1G0', '1G5']),
      field('shield', 'Shield', ['SH', 'UN']),
    ]),
    partClass('LP', 'Power inductor SMD', [
      field('inductance', 'Inductance', ['1uH', '4u7', '10uH', '100uH']),
      field('tolerance', 'Tolerance', ['10%', '20%', '30%'], plusMinus),
      field('package', 'Package', ['2520', '3015', '4020', '5020', '6028']),
      field('isat', 'Isat', ['500mA', '1A', '3A', '5A', '10A', '15A']),
      field('irms', 'Irms', ['500mA', '800mA', '1A', '2A', '4A', '8A']),
      field('dcr', 'DCR', ['10mR', '20mR', '50mR', '80mR', '100mR', '200mR', '1R2']),
      field('shield', 'Shield', ['SH', 'UN']),
    ]),
    partClass('LR', 'RF inductor SMD', [
      field('inductance', 'Inductance', ['1n0', '2n2', '10nH', '100nH']),
      field('tolerance', 'Tolerance', ['1%', '2%', '5%', 'J', 'G'], plusMinus),
      field('package', 'Package', ['01005', '0201', '0402', '0603', '0805'], chip),
      field('srf', 'SRF', ['500MHz', '1G0', '2G4', '3GHz', '6GHz', '10GHz']),
      field('q', 'Q', ['Q30', 'Q50', 'Q100']),
    ]),
    partClass('LC', 'Common mode choke SMD', [
      field('inductance', 'Inductance', ['100uH', '1mH', '4m7']),
      field('tolerance', 'Tolerance', ['20%', '30%'], plusMinus),
      field('package', 'Package', ['0805', '1206', '1812', '2012', '3216', '4532'], chip),
      field('zcm', 'Zcm', ['90R@100MHz', '600R@100MHz', '1kR@100MHz']),
      field('irated', 'Rated current', ['50mA', '100mA', '500mA', '1A', '2A', '3A', '6A']),
      field('dcr', 'DCR', ['50mR', '100mR', '200mR', '500mR', '1R5']),
      field('lines', 'Lines', ['2L', '4L']),
    ]),
    partClass('FB', 'Ferrite bead SMD', [
      field('zimp', 'Impedance', ['100R@100MHz', '120R@100MHz', '600R@100MHz', '1kR@100MHz']),
      field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '1210'], chip),
      field('irated', 'Rated current', ['50mA', '100mA', '500mA', '1A', '2A', '3A', '6A']),
      field('dcr', 'DCR', ['50mR', '80mR', '100mR', '200mR', '500mR', '1R5']),
    ]),
  ],
}

export const inductorsValues: ExampleValues = {
  LL: { inductance: '100nH', tolerance: '5%', package: '0402', srf: '500MHz', shield: 'SH' },
  LP: {
    inductance: '4u7',
    tolerance: '20%',
    package: '5020',
    isat: '3A',
    irms: '2A',
    dcr: '80mR',
    shield: 'SH',
  },
  LR: { inductance: '2n2', tolerance: '2%', package: '0402', srf: '2G4', q: 'Q50' },
  LC: {
    inductance: '4m7',
    tolerance: '20%',
    package: '3216',
    zcm: '600R@100MHz',
    irated: '500mA',
    dcr: '500mR',
    lines: '2L',
  },
  FB: { zimp: '600R@100MHz', package: '0402', irated: '500mA', dcr: '200mR' },
}
