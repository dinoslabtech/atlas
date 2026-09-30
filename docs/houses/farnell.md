# Farnell / Newark / element14

Farnell, Newark, and element14 share one parametric schema (Premier Farnell). Column names below are the Engineer-view headings. UK catalog: [farnell.com](https://uk.farnell.com). US: [newark.com](https://www.newark.com). AU/Asia: [element14.com](https://au.element14.com). Atlas IDs use the field ids in `docs/`. Stock, price, Order Code, Manufacturer Part No, Product Range, and packaging (Cut Tape / Full Reel / Re-Reel) are shop data. They are not Atlas ID fields.

**Qualification (AEC-Q200)** is a shop rating, not an Atlas ID field. Same for AEC-Q101 on discretes.

## Resistors

[Chip SMD Resistors](https://uk.farnell.com/c/passive-components/resistors-fixed-value/chip-smd-resistors).

| Farnell column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | Farnell `10kohm`. Atlas `10k`. |
| Resistance Tolerance | `tolerance` | Farnell `± 1%`. Atlas `1%`. |
| Power Rating | `power` | Farnell `100mW` / `62.5mW`. Atlas `100mW` / `63mW`. On RR, RX, RW, RS, RN. |
| Resistor Case / Package | `package` | `0402 [1005 Metric]` → Atlas `0402`. Drop the metric bracket. |
| Resistor Technology | `tech` | Thick Film / Thin Film → RX `TK` / `TN`. Metal Film (Thin Film) is `TN`. Wirewound is class RW. |
| Temperature Coefficient | `tcr` | Farnell `± 100ppm/°C`. Atlas `100ppm`. |
| Voltage Rating | `voltage` | Atlas `50V`. On RR, RX, RW, RS. |
| Operating Temperature Min | — | Not an Atlas resistor field. |
| Operating Temperature Max | — | Not an Atlas resistor field. |
| Qualification | — | AEC-Q200. Shop rating. |
| Resistor Type | — | General Purpose, Current Sense, Sulfur Resistant. Current Sense selects class RS. Sulfur is not an Atlas field. |
| No. of Terminations | `term` | RS `2T` / `4T`. |
| Network Circuit Type | `config` | Isolated / Bussed → RN `ISO` / `BUS`. |
| No. of Resistors | `count` | RN. |

**Disagreement — Qualification.** AEC-Q200 is a shop filter and a table column. It does not occupy a slot in an Atlas ID. Do not invent an `aec` field.

RR is five fields (`resistance`, `tolerance`, `package`, `power`, `voltage`). TCR and tech stay on RX. Operating Temperature Min/Max is not an Atlas resistor Field.

## Capacitors

[SMD MLCC Multilayer Ceramic Capacitors](https://uk.farnell.com/c/passive-components/capacitors/ceramic-capacitors/smd-mlcc-multilayer-ceramic-capacitors). Electrolytic, tantalum, film, and supercapacitor sit in sibling capacitor categories.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Capacitance | `capacitance` | Farnell `0.1µF`. Atlas `100nF`. |
| Capacitance Tolerance | `tolerance` | |
| Capacitor Case / Package | `package` | `0402 [1005 Metric]` → `0402`. |
| Voltage(DC) | `voltage` | |
| Dielectric Characteristic | `dielectric` | C0G / NP0, X7R, X5R, X7S, Y5V. |
| Equivalent Series Resistance | `esr` | CE/CT/CS. |
| Ripple Current | `ripple` | CE. |
| Operating Temperature Max | `temp` | Grade token `105C`, not the range end alone. On CC, CE, CT, CF. |
| Operating Temperature Min | — | Not Atlas `temp` by itself. |
| Capacitor Type / Technology | `subtype` | Aluminum / Polymer / Hybrid; MnO2 / Polymer. |
| Tantalum Case Code | `case` | A–E (CT). |
| Dielectric Material | `film` | PP, PET, PPS on CF. |
| Qualification | — | AEC-Q200. Shop rating. |

## Inductors

[SMD Power Inductors](https://uk.farnell.com/c/passive-components/inductors/power-inductors/smd-power-inductors). RF: [Multilayer Inductors](https://uk.farnell.com/c/passive-components/inductors/rf-inductors/multilayer-inductors). Ferrite beads and common-mode chokes sit under EMI.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Inductance | `inductance` | |
| Inductance Tolerance | `tolerance` | Name glues `±`. |
| Inductor Case / Package / Power Inductor Case | `package` | EIA for LL/LR/FB. LP uses power footprints. |
| Self Resonant Frequency | `srf` | |
| Inductor Construction | `shield` | Shielded / Unshielded → `SH` / `UN`. |
| RMS Current (Irms) | `irms` / `irated` | LP `irms`; LC/FB `irated`. |
| Saturation Current (Isat) | `isat` | LP. |
| DC Resistance Max | `dcr` | |
| Q Factor | `q` | LR. |
| Impedance | `zimp` / `zcm` | Beads / common-mode. |
| No. of Lines | `lines` | LC. |
| Qualification | — | AEC-Q200. Shop rating. |

## Diodes

[Schottky Rectifier Diodes](https://uk.farnell.com/c/semiconductors-discretes/diodes-rectifiers/schottky-diodes/schottky-rectifier-diodes). Standard rectifiers, Zeners, and LEDs are sibling categories.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Average Forward Current | `current` | DD/DS. |
| Repetitive Peak Reverse Voltage | `voltage` | DD/DS. |
| Forward Voltage Max / Forward Voltage VF Max | `vf` | Atlas `0V7`, `0V3`, `2V0`. On DD, DS, DL. |
| Diode Case Style | `package` | SOD-123, SMA (DO-214AC), SOD-323. |
| Zener Voltage Vz | `voltage` | DZ. |
| Power Dissipation Pd | `power` | DZ. |
| Zener Tolerance | `ztol` | Atlas `2%`, `5%`. On DZ. |
| LED Colour | `color` | DL. |
| Lens Type | `lens` | DL. Diffused / water-clear → Atlas `DIFF` / `CLR`. |
| Qualification | — | AEC-Q101. Shop rating. |

Diode Configuration (Single / Dual) is not an Atlas field. Dual devices are a different type.

## Transistors

MOSFET and bipolar categories under Semiconductors - Discretes.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Continuous Drain Current Id | `current` | MN/MP. |
| Collector Current | `current` | QN/QP. |
| Drain Source Voltage Vds | `voltage` | MN/MP. |
| Collector Emitter Voltage V(br)ceo | `voltage` | QN/QP. |
| Transistor Case Style | `package` | SOT-23, TO-92. |
| Rds(on) | `rds` | Atlas `20mR`. On MN, MP. |
| Gate Source Thresh Voltage Vgs(th) | `vgs` | Atlas `2V5`. On MN, MP. |
| DC Collector Current Gain hFE | `hfe` | Atlas `100`. On QN, QP. |
| Transistor Polarity | — | The Key, not a field. |
| Qualification | — | AEC-Q101. Shop rating. |

## ICs

Key `IC` Fields are `device`, `package`, `pins`. Specimen `IC-LM358-SOIC8-8`. Farnell splits ICs by function under Semiconductors.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part No / Description | `device` | Chip name, e.g. `LM358`. |
| IC Case / Package | `package` | `SOIC-8` → Atlas `SOIC8`. |
| No. of Pins | `pins` | Atlas `8`, `14`, `32`. |
| IC Type / Function | — | Shop taxonomy. Atlas has one Class. |
| Qualification | — | AEC-Q100. Shop rating. |

## Connectors

Pin headers and rectangular connectors under [Connectors](https://uk.farnell.com/c/connectors). Key `JJ` Fields are `type`, `pins`, `pitch`, `orientation`, `mount`. Specimen `JJ-HDR-1x10-2.54mm-VERT-PTH`.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Connector Type | `type` | Atlas `HDR`, `USBC`, `RJ45`, `TB`. |
| No. of Contacts / No. of Positions | `pins` | Atlas `1x10`, `1x8`, `2x5`, `2PIN`. |
| Pitch Spacing | `pitch` | Atlas `2.54mm`. |
| Connector Mounting | `mount` | `PTH` / `SMD`. |
| Termination Method | — | Not an Atlas Field. |
| Orientation / Contact Gender | `orientation` | Straight / Right Angle → `VERT` / `RA`. Gender is not in the Atlas field list. |

Shop packaging, stock, and MPN stay out of Atlas.
