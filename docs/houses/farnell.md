# Farnell / Newark / element14

Farnell, Newark, and element14 share one parametric schema (Premier Farnell). Column names below are the Engineer-view headings. UK catalog: [farnell.com](https://uk.farnell.com). US: [newark.com](https://www.newark.com). AU/Asia: [element14.com](https://au.element14.com). Atlas IDs use the field ids in `docs/`. Stock, price, Order Code, Manufacturer Part No, Product Range, and packaging (Cut Tape / Full Reel / Re-Reel) are shop data. They are not Atlas ID fields.

**Qualification (AEC-Q200)** is a shop rating, not an Atlas ID field. Same for AEC-Q101 on discretes.

## Resistors

[Chip SMD Resistors](https://uk.farnell.com/c/passive-components/resistors-fixed-value/chip-smd-resistors).

| Farnell column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | Farnell `10kohm`. Atlas `10k`. |
| Resistance Tolerance | `tolerance` | Farnell `± 1%`. Atlas `1%`. |
| Power Rating | `power` | Farnell `100mW` / `62.5mW`. Atlas `100mW` / `63mW`. RR does not carry power. |
| Resistor Case / Package | `package` | `0402 [1005 Metric]` → Atlas `0402`. Drop the metric bracket. |
| Resistor Technology | `tech` | Thick Film / Thin Film → RX `TK` / `TN`. Metal Film (Thin Film) is `TN`. Wirewound is class RW. |
| Temperature Coefficient | `tcr` | Farnell `± 100ppm/°C`. Atlas `100ppm`. |
| Voltage Rating | `voltage` | Shop working voltage. Not on RR/RX ID. |
| Operating Temperature Min | — | Not an Atlas resistor field. |
| Operating Temperature Max | — | Not an Atlas resistor field. |
| Qualification | — | AEC-Q200. Shop rating. |
| Resistor Type | — | General Purpose, Current Sense, Sulfur Resistant. Current Sense selects class RS. Sulfur is not an Atlas field. |
| No. of Terminations | `term` | RS `2T` / `4T`. |
| Network Circuit Type | `config` | Isolated / Bussed → RN `ISO` / `BUS`. |
| No. of Resistors | `count` | RN. |

**Disagreement — Qualification.** AEC-Q200 is a shop filter and a table column. It does not occupy a slot in an Atlas ID. Do not invent an `aec` field.

RR is three fields. Farnell always shows Power Rating, Resistor Technology, Temperature Coefficient, Voltage Rating, and Operating Temperature Min/Max; those extras belong on RX or nowhere.

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
| Operating Temperature Max | `temp` | CE token is `105C`, not the range end alone. |
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
| Forward Voltage Max / Forward Voltage VF Max | `vf` | Shop column. Not on current DD/DS ID. |
| Diode Case Style | `package` | SOD-123, SMA (DO-214AC), SOD-323. |
| Zener Voltage Vz | `voltage` | DZ. |
| Power Dissipation Pd | `power` | DZ. |
| Zener Tolerance | `ztol` | Not on current DZ ID. |
| LED Colour | `color` | DL. |
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
| Rds(on) | `rds` | Not on current MN/MP ID. |
| Gate Source Thresh Voltage Vgs(th) | `vgs` | Not on current MN/MP ID. |
| DC Collector Current Gain hFE | `hfe` | Not on current QN/QP ID. |
| Transistor Polarity | — | The Key, not a field. |
| Qualification | — | AEC-Q101. Shop rating. |

## ICs

Still being specified. Key `IC` has zero fields. Farnell splits ICs by function under Semiconductors.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part No / Description | `device` | Candidate. |
| IC Case / Package | `package` | Candidate. |
| No. of Pins | `pins` | Candidate. |
| IC Type / Function | `type` | Candidate. |
| Qualification | — | AEC-Q100. Shop rating. |

## Connectors

Pin headers and rectangular connectors under [Connectors](https://uk.farnell.com/c/connectors). Key `JJ` has zero fields.

| Farnell column | Atlas field | Notes |
|---|---|---|
| Connector Type | `type` | Candidate. |
| No. of Contacts / No. of Positions | `pins` | Candidate. |
| Pitch Spacing | `pitch` | Candidate. `2.54mm`. |
| Connector Mounting | `mount` | Candidate. |
| Termination Method | `term` | Candidate. |
| Orientation / Contact Gender | `orientation` | Straight / Right Angle is orientation. Gender is not in the Atlas field list. |

Shop packaging, stock, and MPN stay out of Atlas.
