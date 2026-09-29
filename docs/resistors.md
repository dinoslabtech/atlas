# Resistors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/Resistors.md` and `components/passive/resistors.yaml`.

Field order is the detailed `ID:` template for each class, with DigiKey/Mouser identity fields appended. Distributor filter names live in `docs/houses/`.

| Key | Name | Fields |
|---|---|---|
| RR | Thick film / thin film SMD chip | resistance, tolerance, package, power, voltage |
| RX | Thick film / thin film SMD chip (full) | resistance, tolerance, package, power, tcr, tech, voltage |
| RW | Wirewound SMD | resistance, tolerance, package, power, tcr, winding, voltage |
| RS | Shunt / current sense | resistance, tolerance, package, power, tcr, term, voltage |
| RN | Resistor network / array | resistance, tolerance, package, power, count, config, tcr |

## Specimens

| Key | ID | Name |
|---|---|---|
| RR | `RR-10k-1%-0402-63mW-50V` | `RR 10k 1% 0402 63mW 50V` |
| RX | `RX-10k-1%-0402-100mW-100ppm-TK-50V` | `RX 10k 1% 0402 100mW 100ppm TK 50V` |
| RW | `RW-10R-1%-0805-500mW-50ppm-NI-50V` | `RW 10R 1% 0805 500mW 50ppm NI 50V` |
| RS | `RS-10mR-1%-2512-2W-75ppm-4T-50V` | `RS 10mR 1% 2512 2W 75ppm 4T 50V` |
| RN | `RN-10k-1%-0402x4-63mW-4-ISO-100ppm` | `RN 10k 1% 0402x4 63mW 4 ISO 100ppm` |

RR package examples include `01005`, `1210`, and `2010`. `01005` is not on the chip size drawing.

Power tokens on RR: `63mW`, `100mW`, `125mW`, `250mW`, `500mW`, `1W`. Voltage tokens: `25V`, `50V`, `75V`, `100V`, `150V`, `200V`. RN TCR tokens: `10ppm`, `25ppm`, `50ppm`, `100ppm`, `200ppm`.

Tech tokens: `TK` thick film, `TN` thin film. Winding: `STD`, `NI`. Termination: `2T`, `4T`. Network config: `ISO`, `BUS`.

The first three RR fields still format as `RR-10k-1%-0402` when power and voltage are omitted.

## Disagreements

- The summary table in Resistors.md lists RR, RW, RS, RN and omits RX. The detailed section and the YAML define RX. Atlas seeds RX.
- The same summary table marks power, TCR, and tech on RR. The detailed RR ID is three fields. Atlas keeps resistance, tolerance, package and appends power and voltage (DigiKey/Mouser identity). TCR and tech stay on RX.
