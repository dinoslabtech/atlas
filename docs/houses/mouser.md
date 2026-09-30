# Mouser

Catalog filters live under [mouser.com/c/](https://www.mouser.com/c/). Column names below are the parametric headings on those category tables. Atlas IDs use the field ids in `docs/`. Stock, price, Mouser Part #, Mfr. Part #, Series, and packaging (Reel / Cut Tape / MouseReel) are shop data. They are not Atlas ID fields.

**Qualification = AEC-Q200** is a shop rating, not an Atlas ID field.

## Resistors

[SMD Resistors / Chip Resistors](https://www.mouser.com/c/passive-components/resistors/smd-resistors-chip-resistors/). Networks: [Resistor Networks & Arrays](https://www.mouser.com/c/passive-components/resistors/resistor-networks-arrays/). Current sense: [Current Sense Resistors](https://www.mouser.com/c/passive-components/resistors/current-sense-resistors/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | Mouser `10 kOhms`. Atlas `10k`. |
| Tolerance | `tolerance` | Mouser `1 %`. Atlas `1%`. |
| Power Rating | `power` | Mouser `125 mW (1/8 W)`. Atlas `125mW`. On RR, RX, RW, RS, RN. |
| Case Code - in | `package` | EIA imperial (`0402`, `0603`, `0805`). This is the Atlas chip token. |
| Case Code - mm | — | Metric twin (`1005`, `1608`, `2012`). Not an Atlas package token. |
| Temperature Coefficient | `tcr` | Mouser `100 PPM / C`. Atlas `100ppm`. |
| Voltage Rating | `voltage` | Atlas `50V`. On RR, RX, RW, RS, RN. |
| Product (Thick Film / Thin Film / Wirewound) | `tech` / class | Thick/Thin → RX `TK`/`TN`. Wirewound is class RW, not tech. |
| Number of Terminations / Termination Style | `term` | Kelvin 4-terminal → RS `4T`. |
| Circuit Type | `config` | Isolated / Bussed → RN `ISO` / `BUS`. |
| Number of Resistors | `count` | RN. |
| Qualification | — | AEC-Q200. Shop rating. |

**Disagreement — Case Code - in vs EIA package.** Atlas `package` for chips is the EIA imperial code (`0402`). Mouser exposes two columns. Use **Case Code - in**. Do not write **Case Code - mm** (`1005`) into an Atlas ID. Some rows swap the two columns (metric value in the inch field); check the part, do not trust the header blindly. Power-inductor and outline packages are not Case Code - in values.

RR is five fields (`resistance`, `tolerance`, `package`, `power`, `voltage`). TCR and tech stay on RX.

## Capacitors

[MLCCs](https://www.mouser.com/c/passive-components/capacitors/mlccs/). Also [Aluminum Electrolytic Capacitors](https://www.mouser.com/c/passive-components/capacitors/aluminum-electrolytic-capacitors/), [Tantalum Capacitors](https://www.mouser.com/c/passive-components/capacitors/tantalum-capacitors/), [Film Capacitors](https://www.mouser.com/c/passive-components/capacitors/film-capacitors/), [Supercapacitors](https://www.mouser.com/c/passive-components/capacitors/supercapacitors/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Capacitance | `capacitance` | Mouser `0.1 uF`. Atlas `100nF`. |
| Tolerance | `tolerance` | |
| Voltage Rating DC | `voltage` | Mouser `50 VDC`. Atlas `50V`. |
| Dielectric | `dielectric` | C0G (NP0), X7R, X5R, X7S, Y5V. |
| Case Code - in | `package` | EIA imperial for CC. Same disagreement as resistors. |
| Case Code - mm | — | Not Atlas `package`. |
| ESR | `esr` | CE/CT/CS. |
| Ripple Current | `ripple` | CE. |
| Maximum Operating Temperature | `temp` | Grade token `105C`, not `+ 125 C` as a range end. On CC, CE, CT, CF. Supercap grades include `70C` (CS). |
| Thickness | `thickness` | MLCC body height. Atlas `0.5mm`, `0.8mm`. On CC only. |
| Product / Type | `subtype` | Aluminum / Polymer / Hybrid → `AL` / `ALP` / `ALH`. MnO2 / Polymer → `MNO2` / `POLY`. |
| Case Code / Size | `case` | Tantalum A–E is Atlas `case` (CT). |
| Dielectric / Film Type | `film` | PP, PET, PPS on CF. |
| Qualification | — | AEC-Q200. Shop rating. |

## Inductors

[Power Inductors](https://www.mouser.com/c/passive-components/inductors-chokes-coils/power-inductors/). [RF Inductors - Chips / Fixed Inductors](https://www.mouser.com/c/passive-components/inductors-chokes-coils/rf-inductors-chips-fixed-inductors/). [Ferrite Beads](https://www.mouser.com/c/passive-components/emi-filters-emi-suppression/ferrite-beads/). [Common Mode Chokes / Filters](https://www.mouser.com/c/passive-components/emi-filters-emi-suppression/common-mode-chokes-filters/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Inductance | `inductance` | |
| Tolerance | `tolerance` | Name glues `±`. |
| Case Code - in / Package / Case | `package` | EIA for LL/LR/FB. LP uses power footprints (`2520`, `5020`). |
| Shielding | `shield` | Shielded / Unshielded → `SH` / `UN`. |
| Maximum DC Current / Current Rating | `irms` or `irated` | One current on many rows. LP `irms`; LL/LC/FB `irated`. |
| Saturation Current | `isat` | LP. Often absent. |
| DCR / Maximum DC Resistance | `dcr` | |
| Self Resonant Frequency / SRF | `srf` | |
| Q | `q` | LR. Atlas `Q50`. |
| Impedance | `zimp` / `zcm` | Beads `zimp`; common-mode `zcm`. Token `600R@100MHz`. |
| Impedance @ 1 GHz | `z1g` | Beads. Atlas `1kR@1GHz`. |
| Number of Lines / Channels | `lines` | LC `2L` / `4L`. |
| Qualification | — | AEC-Q200. Shop rating. |

Mouser often lists a single Maximum DC Current. That does not fill both LP `isat` and `irms`.

## Diodes

[Diodes & Rectifiers](https://www.mouser.com/c/semiconductors/discrete-semiconductors/diodes-rectifiers/). Schottky, Zener, and LED Indication are subcategories.

| Mouser column | Atlas field | Notes |
|---|---|---|
| If - Forward Current / Ifs - Forward Current | `current` | DD/DS. |
| Vr Reverse Voltage / Vr - Reverse Voltage | `voltage` | DD/DS. |
| Vf Forward Voltage / Vf - Forward Voltage | `vf` | Atlas `0V7`, `0V3`, `2V0`. On DD, DS, DL. |
| Zener Voltage | `voltage` | DZ. |
| Pd - Power Dissipation | `power` | DZ. |
| Zener Voltage Tolerance | `ztol` | Atlas `2%`, `5%`. On DZ. |
| If / Vr / Vf | `current` / `voltage` / `vf` | The rectifier trio. Atlas DD/DS ID is `current`, `package`, `voltage`, `vf`. |
| Package / Case | `package` | SOD123, SMA, SOD323. |
| LED Color | `color` | DL. |
| Lens Color/Style | `lens` | DL. Diffused vs water-clear → Atlas `DIFF` / `CLR`. |
| Qualification | — | AEC-Q101. Shop rating. |

Standard vs Schottky vs Zener vs LED selects class DD / DS / DZ / DL. Not a field.

## Transistors

[MOSFETs](https://www.mouser.com/c/semiconductors/discrete-semiconductors/transistors/mosfets/). [Bipolar Transistors](https://www.mouser.com/c/semiconductors/discrete-semiconductors/transistors/bipolar-transistors/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Id - Continuous Drain Current | `current` | MN/MP. |
| Ic - Collector Current | `current` | QN/QP. |
| Vds - Drain-Source Breakdown Voltage | `voltage` | MN/MP. |
| Vceo / Collector-Emitter Voltage | `voltage` | QN/QP. |
| Rds On - Drain-Source Resistance | `rds` | Atlas `20mR`. On MN, MP. |
| Vgs th - Gate-Source Threshold Voltage | `vgs` | Atlas `2V5`. On MN, MP. |
| hFE - DC Current Gain | `hfe` | Atlas `100`. On QN, QP. |
| Package / Case | `package` | SOT23, TO-92. |
| Transistor Polarity | — | N-Channel / P-Channel / NPN / PNP is the Key, not a field. |

## ICs

Key `IC` Fields are `device`, `package`, `pins`. Specimen `IC-LM358-SOIC8-8`. Mouser splits ICs under [Integrated Circuits](https://www.mouser.com/c/semiconductors/integrated-circuits-ics/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part Number | `device` | Chip name, e.g. `LM358`. |
| Package / Case | `package` | `SOIC-8` → Atlas `SOIC8`. |
| Number of Pins | `pins` | Atlas `8`, `14`, `32`. |
| Product / Type | — | Shop function. Atlas has one Class. |

## Connectors

[Connectors](https://www.mouser.com/c/connectors/). Headers sit under rectangular / pin-header subcategories. Key `JJ` Fields are `type`, `pins`, `pitch`, `orientation`, `mount`. Specimen `JJ-HDR-1x10-2.54mm-VERT-PTH`.

| Mouser column | Atlas field | Notes |
|---|---|---|
| Connector Type / Product | `type` | Atlas `HDR`, `USBC`, `RJ45`, `TB`. |
| Number of Positions | `pins` | Atlas `1x10`, `1x8`, `2x5`, `2PIN`. |
| Pitch | `pitch` | Atlas `2.54mm`. |
| Mounting Style / Mounting Type | `mount` | `PTH` / `SMD`. |
| Termination Style | — | Not an Atlas Field. |
| Orientation | `orientation` | Straight / Right Angle → `VERT` / `RA`. |

Shop packaging, stock, and MPN stay out of Atlas.
