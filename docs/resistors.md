# Resistors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/Resistors.md` and `components/passive/resistors.yaml`.

Field order is the detailed `ID:` template for each class.

| Key | Name | Fields |
|---|---|---|
| RR | Thick film / thin film SMD chip | resistance, tolerance, package |
| RX | Thick film / thin film SMD chip (full) | resistance, tolerance, package, power, tcr, tech |
| RW | Wirewound SMD | resistance, tolerance, package, power, tcr, winding |
| RS | Shunt / current sense | resistance, tolerance, package, power, tcr, term |
| RN | Resistor network / array | resistance, tolerance, package, power, count, config |

## Specimens

| Key | ID | Name |
|---|---|---|
| RR | `RR-10k-1%-0402` | `RR 10k 1% 0402` |
| RX | `RX-10k-1%-0402-100mW-100ppm-TK` | `RX 10k 1% 0402 100mW 100ppm TK` |
| RW | `RW-10R-1%-0805-500mW-50ppm-NI` | `RW 10R 1% 0805 500mW 50ppm NI` |
| RS | `RS-10mR-1%-2512-2W-75ppm-4T` | `RS 10mR 1% 2512 2W 75ppm 4T` |
| RN | `RN-10k-1%-0402x4-63mW-4-ISO` | `RN 10k 1% 0402x4 63mW 4 ISO` |

RR package examples include `01005`. That code is not on the chip size drawing.

Tech tokens: `TK` thick film, `TN` thin film. Winding: `STD`, `NI`. Termination: `2T`, `4T`. Network config: `ISO`, `BUS`.

## Disagreements

- The summary table in Resistors.md lists RR, RW, RS, RN and omits RX. The detailed section and the YAML define RX. Atlas seeds RX.
- The same summary table marks power, TCR, and tech on RR. The detailed RR ID is three fields. Atlas seeds the three-field RR.
