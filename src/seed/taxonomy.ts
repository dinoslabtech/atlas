import type { ExampleValues, Family, FieldDef, PartClass } from './types'

function field(id: string, label: string, examples: string[], kind?: FieldDef['kind']): FieldDef {
  return { id, label, examples, ...(kind ? { kind } : {}) }
}

function partClass(key: string, name: string, fields: FieldDef[]): PartClass {
  return { key, name, fields }
}

const chip = 'chip-package' as const
const plusMinus = 'tolerance-plusminus' as const

export const seedFamilies: Family[] = [
  {
    id: 'resistors',
    name: 'Resistors',
    group: 'Passives',
    specified: true,
    classes: [
      partClass('RR', 'Thick film / thin film SMD chip', [
        field('resistance', 'Resistance', ['100R', '4R7', '10k', '1M', '0R']),
        field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%', '10%']),
        field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '2512'], chip),
      ]),
      partClass('RX', 'Thick film / thin film SMD chip (full)', [
        field('resistance', 'Resistance', ['100R', '4R7', '10k', '1M', '0R']),
        field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%', '10%']),
        field('package', 'Package', ['01005', '0201', '0402', '0603', '0805', '1206', '2512'], chip),
        field('power', 'Power', ['63mW', '100mW', '125mW', '250mW', '500mW', '1W']),
        field('tcr', 'TCR', ['10ppm', '25ppm', '100ppm', '200ppm']),
        field('tech', 'Tech', ['TK', 'TN']),
      ]),
      partClass('RW', 'Wirewound SMD', [
        field('resistance', 'Resistance', ['1R0', '10R', '100R']),
        field('tolerance', 'Tolerance', ['0.1%', '0.5%', '1%', '5%']),
        field('package', 'Package', ['0402', '0603', '0805', '1206', '2512'], chip),
        field('power', 'Power', ['250mW', '500mW', '1W', '2W']),
        field('tcr', 'TCR', ['10ppm', '20ppm', '50ppm', '100ppm']),
        field('winding', 'Winding', ['STD', 'NI']),
      ]),
      partClass('RS', 'Shunt / current sense', [
        field('resistance', 'Resistance', ['1mR', '5mR', '10mR', '50mR', '100mR', '1R0']),
        field('tolerance', 'Tolerance', ['0.5%', '1%', '5%']),
        field('package', 'Package', ['1206', '2010', '2512', '3920', '5930'], chip),
        field('power', 'Power', ['1W', '2W', '3W', '5W']),
        field('tcr', 'TCR', ['10ppm', '50ppm', '75ppm', '100ppm']),
        field('term', 'Termination', ['2T', '4T']),
      ]),
      partClass('RN', 'Resistor network / array', [
        field('resistance', 'Resistance', ['10k', '100R', '4k7']),
        field('tolerance', 'Tolerance', ['1%', '2%', '5%']),
        field('package', 'Package', ['0402x4', '0603x4', '1206x8', 'SOP8']),
        field('power', 'Power', ['63mW', '100mW']),
        field('count', 'Count', ['4', '8']),
        field('config', 'Configuration', ['ISO', 'BUS']),
      ]),
    ],
  },
  {
    id: 'capacitors',
    name: 'Capacitors',
    group: 'Passives',
    specified: true,
    classes: [
      partClass('CC', 'Ceramic (MLCC)', [
        field('capacitance', 'Capacitance', ['100nF', '10uF', '1pF']),
        field('tolerance', 'Tolerance', ['1%', '5%', '10%', '20%', 'C', 'D']),
        field('package', 'Package', ['0201', '0402', '0603', '0805', '1206'], chip),
        field('voltage', 'Voltage', ['10V', '16V', '50V', '100V']),
        field('dielectric', 'Dielectric', ['C0G', 'X7R', 'X5R', 'X7S', 'Y5V']),
      ]),
      partClass('CE', 'Electrolytic (aluminum, polymer, hybrid)', [
        field('capacitance', 'Capacitance', ['100uF', '1000uF']),
        field('tolerance', 'Tolerance', ['20%']),
        field('package', 'Package', ['0810', 'THT8x16']),
        field('voltage', 'Voltage', ['16V', '35V', '100V']),
        field('esr', 'ESR', ['20mR', '100mR']),
        field('ripple', 'Ripple', ['500mA', '2A']),
        field('temp', 'Temperature', ['85C', '105C', '125C']),
        field('subtype', 'Subtype', ['AL', 'ALP', 'ALH']),
      ]),
      partClass('CT', 'Tantalum / polymer-tantalum', [
        field('capacitance', 'Capacitance', ['10uF', '47uF']),
        field('tolerance', 'Tolerance', ['10%', '20%']),
        field('case', 'Case', ['A', 'B', 'C', 'D', 'E']),
        field('voltage', 'Voltage', ['10V', '16V', '35V']),
        field('esr', 'ESR', ['300mR', '50mR']),
        field('subtype', 'Subtype', ['MNO2', 'POLY']),
      ]),
      partClass('CF', 'Film', [
        field('capacitance', 'Capacitance', ['100nF', '1uF']),
        field('tolerance', 'Tolerance', ['1%', '2%', '5%', '10%']),
        field('package', 'Package', ['1210', 'THT5mm', 'THT7R5mm'], chip),
        field('voltage', 'Voltage', ['50V', '250V', '630V']),
        field('film', 'Film', ['PP', 'PET', 'PPS', 'PC']),
      ]),
      partClass('CS', 'Supercapacitor / EDLC', [
        field('capacitance', 'Capacitance', ['1F', '10F', '100F', '470mF']),
        field('tolerance', 'Tolerance', ['20%', '30%']),
        field('package', 'Package', ['1210', 'THT10x30'], chip),
        field('voltage', 'Voltage', ['2V5', '5V', '5V5']),
        field('esr', 'ESR', ['10mR', '100mR', '1R']),
      ]),
    ],
  },
  {
    id: 'inductors',
    name: 'Inductors',
    group: 'Passives',
    specified: true,
    classes: [
      partClass('LL', 'Signal / general purpose SMD chip inductor', [
        field('inductance', 'Inductance', ['100nH', '1uH', '4u7', '10uH']),
        field('tolerance', 'Tolerance', ['1%', '2%', '5%', '10%'], plusMinus),
        field('package', 'Package', ['0201', '0402', '0603', '0805', '1206'], chip),
        field('srf', 'SRF', ['100MHz', '500MHz', '1G5']),
        field('shield', 'Shield', ['SH', 'UN']),
      ]),
      partClass('LP', 'Power inductor SMD', [
        field('inductance', 'Inductance', ['1uH', '4u7', '10uH', '100uH']),
        field('tolerance', 'Tolerance', ['10%', '20%', '30%'], plusMinus),
        field('package', 'Package', ['2520', '3015', '4020', '5020', '6028']),
        field('isat', 'Isat', ['1A', '3A', '10A']),
        field('irms', 'Irms', ['800mA', '2A', '8A']),
        field('dcr', 'DCR', ['50mR', '200mR', '1R2', '80mR']),
        field('shield', 'Shield', ['SH', 'UN']),
      ]),
      partClass('LR', 'RF inductor SMD', [
        field('inductance', 'Inductance', ['1n0', '2n2', '10nH', '100nH']),
        field('tolerance', 'Tolerance', ['1%', '2%', '5%', 'J', 'G'], plusMinus),
        field('package', 'Package', ['0201', '0402', '0603'], chip),
        field('srf', 'SRF', ['1G0', '2G4', '6GHz']),
        field('q', 'Q', ['Q30', 'Q50', 'Q100']),
      ]),
      partClass('LC', 'Common mode choke SMD', [
        field('inductance', 'Inductance', ['100uH', '1mH', '4m7']),
        field('tolerance', 'Tolerance', ['20%', '30%'], plusMinus),
        field('package', 'Package', ['1206', '2012', '3216', '4532'], chip),
        field('zcm', 'Zcm', ['90R@100MHz', '600R@100MHz', '1kR@100MHz']),
        field('irated', 'Rated current', ['100mA', '500mA', '2A', '6A']),
        field('dcr', 'DCR', ['200mR', '500mR', '1R5']),
        field('lines', 'Lines', ['2L', '4L']),
      ]),
      partClass('FB', 'Ferrite bead SMD', [
        field('zimp', 'Impedance', ['100R@100MHz', '600R@100MHz', '1kR@100MHz']),
        field('package', 'Package', ['0201', '0402', '0603', '0805', '1206'], chip),
        field('irated', 'Rated current', ['100mA', '500mA', '2A', '6A']),
        field('dcr', 'DCR', ['100mR', '200mR', '500mR', '1R5']),
      ]),
    ],
  },
  {
    id: 'diodes',
    name: 'Diodes',
    specified: true,
    classes: [
      partClass('DD', 'Standard diode', [
        field('current', 'Current', ['150mA', '1A']),
        field('package', 'Package', ['SOD123', 'SOD323', 'SMA']),
        field('voltage', 'Voltage', ['100V', '40V', '12V']),
      ]),
      partClass('DS', 'Schottky', [
        field('current', 'Current', ['150mA', '1A']),
        field('package', 'Package', ['SMA', 'SOD123', 'SOD323']),
        field('voltage', 'Voltage', ['40V', '100V']),
      ]),
      partClass('DZ', 'Zener', [
        field('voltage', 'Voltage', ['12V', '40V', '100V']),
        field('package', 'Package', ['SOD323', 'SOD123']),
        field('power', 'Power', ['500mW']),
      ]),
      partClass('DL', 'LED', [
        field('color', 'Color', ['RED', 'BLUE']),
        field('package', 'Package', ['0603', 'PTH-3mm'], chip),
      ]),
    ],
  },
  {
    id: 'transistors',
    name: 'Transistors',
    specified: true,
    classes: [
      partClass('QN', 'BJT NPN', [
        field('current', 'Current', ['200mA', '1A', '3A']),
        field('package', 'Package', ['SOT23', 'PTH-TO92']),
        field('voltage', 'Voltage', ['40V', '30V', '60V']),
      ]),
      partClass('QP', 'BJT PNP', [
        field('current', 'Current', ['200mA', '1A', '3A']),
        field('package', 'Package', ['SOT23', 'PTH-TO92']),
        field('voltage', 'Voltage', ['40V', '30V', '60V']),
      ]),
      partClass('MN', 'MOSFET N-channel', [
        field('current', 'Current', ['3A', '200mA', '1A']),
        field('package', 'Package', ['SOT23', 'PTH-TO92']),
        field('voltage', 'Voltage', ['30V', '40V', '60V']),
      ]),
      partClass('MP', 'MOSFET P-channel', [
        field('current', 'Current', ['3A', '200mA', '1A']),
        field('package', 'Package', ['SOT23', 'PTH-TO92']),
        field('voltage', 'Voltage', ['30V', '40V', '60V']),
      ]),
    ],
  },
  {
    id: 'ics',
    name: 'ICs',
    specified: false,
    classes: [partClass('IC', 'Integrated circuit', [])],
  },
  {
    id: 'connectors',
    name: 'Connectors',
    specified: false,
    classes: [partClass('JJ', 'Connector', [])],
  },
]

export const seedValues: ExampleValues = {
  RR: { resistance: '10k', tolerance: '1%', package: '0402' },
  RX: { resistance: '10k', tolerance: '1%', package: '0402', power: '100mW', tcr: '100ppm', tech: 'TK' },
  RW: { resistance: '10R', tolerance: '1%', package: '0805', power: '500mW', tcr: '50ppm', winding: 'NI' },
  RS: { resistance: '10mR', tolerance: '1%', package: '2512', power: '2W', tcr: '75ppm', term: '4T' },
  RN: { resistance: '10k', tolerance: '1%', package: '0402x4', power: '63mW', count: '4', config: 'ISO' },
  CC: { capacitance: '100nF', tolerance: '10%', package: '0402', voltage: '50V', dielectric: 'X7R' },
  CE: {
    capacitance: '100uF',
    tolerance: '20%',
    package: '0810',
    voltage: '35V',
    esr: '100mR',
    ripple: '500mA',
    temp: '105C',
    subtype: 'AL',
  },
  CT: { capacitance: '10uF', tolerance: '10%', case: 'B', voltage: '16V', esr: '300mR', subtype: 'MNO2' },
  CF: { capacitance: '100nF', tolerance: '5%', package: 'THT5mm', voltage: '250V', film: 'PP' },
  CS: { capacitance: '1F', tolerance: '20%', package: 'THT10x30', voltage: '2V5', esr: '100mR' },
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
  DD: { current: '150mA', package: 'SOD123', voltage: '100V' },
  DS: { current: '1A', package: 'SMA', voltage: '40V' },
  DZ: { voltage: '12V', package: 'SOD323', power: '500mW' },
  DL: { color: 'RED', package: '0603' },
  QN: { current: '200mA', package: 'SOT23', voltage: '40V' },
  QP: { current: '200mA', package: 'SOT23', voltage: '40V' },
  MN: { current: '3A', package: 'SOT23', voltage: '30V' },
  MP: { current: '3A', package: 'SOT23', voltage: '30V' },
  IC: {},
  JJ: {},
}

export const DEFAULT_FAMILY_ID = 'resistors'
export const DEFAULT_CLASS_KEY = 'RR'
