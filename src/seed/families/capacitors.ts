import type { ExampleValues, Family } from '../types'
import { chip, field, partClass } from '../build'

export const capacitorsFamily: Family = {
  id: 'capacitors',
  name: 'Capacitors',
  group: 'Passives',
  specified: true,
  classes: [
    partClass('CC', 'Ceramic (MLCC)', [
      field('capacitance', 'Capacitance', ['100nF', '10uF', '1pF']),
      field('tolerance', 'Tolerance', ['1%', '5%', '10%', '20%', 'C', 'D']),
      field('package', 'Package', ['0201', '0402', '0603', '0805', '1206'], chip),
      field('voltage', 'Voltage', ['10V', '16V', '50V', '100V', '6V3', '25V']),
      field('dielectric', 'Dielectric', ['C0G', 'X7R', 'X5R', 'X7S', 'Y5V', 'X6S', 'NP0']),
      field('temp', 'Temperature', ['85C', '105C', '125C']),
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
      field('lifetime', 'Lifetime', ['2000h', '5000h']),
    ]),
    partClass('CT', 'Tantalum / polymer-tantalum', [
      field('capacitance', 'Capacitance', ['10uF', '47uF']),
      field('tolerance', 'Tolerance', ['10%', '20%']),
      field('case', 'Case', ['A', 'B', 'C', 'D', 'E']),
      field('voltage', 'Voltage', ['10V', '16V', '35V']),
      field('esr', 'ESR', ['300mR', '50mR']),
      field('subtype', 'Subtype', ['MNO2', 'POLY']),
      field('temp', 'Temperature', ['85C', '105C', '125C']),
    ]),
    partClass('CF', 'Film', [
      field('capacitance', 'Capacitance', ['100nF', '1uF']),
      field('tolerance', 'Tolerance', ['1%', '2%', '5%', '10%']),
      field('package', 'Package', ['1210', 'THT5mm', 'THT7R5mm'], chip),
      field('voltage', 'Voltage', ['50V', '250V', '630V']),
      field('film', 'Film', ['PP', 'PET', 'PPS', 'PC']),
      field('temp', 'Temperature', ['85C', '105C']),
    ]),
    partClass('CS', 'Supercapacitor / EDLC', [
      field('capacitance', 'Capacitance', ['1F', '10F', '100F', '470mF', '220mF', '5F']),
      field('tolerance', 'Tolerance', ['20%', '30%', '10%']),
      field('package', 'Package', ['1210', 'THT10x30', 'THT8x12'], chip),
      field('voltage', 'Voltage', ['2V5', '5V', '5V5', '2V7', '3V']),
      field('esr', 'ESR', ['10mR', '100mR', '1R', '30mR']),
    ]),
  ],
}

export const capacitorsValues: ExampleValues = {
  CC: {
    capacitance: '100nF',
    tolerance: '10%',
    package: '0402',
    voltage: '50V',
    dielectric: 'X7R',
    temp: '125C',
  },
  CE: {
    capacitance: '100uF',
    tolerance: '20%',
    package: '0810',
    voltage: '35V',
    esr: '100mR',
    ripple: '500mA',
    temp: '105C',
    subtype: 'AL',
    lifetime: '2000h',
  },
  CT: {
    capacitance: '10uF',
    tolerance: '10%',
    case: 'B',
    voltage: '16V',
    esr: '300mR',
    subtype: 'MNO2',
    temp: '125C',
  },
  CF: {
    capacitance: '100nF',
    tolerance: '5%',
    package: 'THT5mm',
    voltage: '250V',
    film: 'PP',
    temp: '85C',
  },
  CS: { capacitance: '1F', tolerance: '20%', package: 'THT10x30', voltage: '2V5', esr: '100mR' },
}
