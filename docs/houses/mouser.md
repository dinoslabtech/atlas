# Mouser

Catalog filters live under [mouser.com/c/](https://www.mouser.com/c/). Column names below are the parametric headings on those category tables. Atlas IDs use the field ids in `docs/`. Stock, price, Mouser Part #, Mfr. Part #, Series, and packaging (Reel / Cut Tape / MouseReel) are shop data. They are not Atlas ID fields.

**Qualification = AEC-Q200** is a shop rating, not an Atlas ID field.

## Resistors

[SMD Resistors / Chip Resistors](https://www.mouser.com/c/passive-components/resistors/smd-resistors-chip-resistors/). Networks: [Resistor Networks & Arrays](https://www.mouser.com/c/passive-components/resistors/resistor-networks-arrays/). Current sense: [Current Sense Resistors](https://www.mouser.com/c/passive-components/resistors/current-sense-resistors/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | Mouser `10 kOhms`. Atlas `10k`. |
| Tolerance | `tolerance` | Mouser `1 %`. Atlas `1%`. |
| Power Rating | `power` | Mouser `125 mW (1/8 W)`. Atlas `125mW`. RR does not carry power. |
| Case Code - in | `package` | EIA imperial (`0402`, `0603`, `0805`). This is the Atlas chip token. |
| Case Code - mm | — | Metric twin (`1005`, `1608`, `2012`). Not an Atlas package token. |
| Temperature Coefficient | `tcr` | Mouser `100 PPM / C`. Atlas `100ppm`. |
| Voltage Rating | `voltage` | Shop working voltage. Not on RR/RX ID. |
| Product (Thick Film / Thin Film / Wirewound) | `tech` / class | Thick/Thin → RX `TK`/`TN`. Wirewound is class RW, not tech. |
| Number of Terminations / Termination Style | `term` | Kelvin 4-terminal → RS `4T`. |
| Circuit Type | `config` | Isolated / Bussed → RN `ISO` / `BUS`. |
| Number of Resistors | `count` | RN. |
| Qualification | — | AEC-Q200. Shop rating. |

**Disagreement — Case Code - in vs EIA package.** Atlas `package` for chips is the EIA imperial code (`0402`). Mouser exposes two columns. Use **Case Code - in**. Do not write **Case Code - mm** (`1005`) into an Atlas ID. Some rows swap the two columns (metric value in the inch field); check the part, do not trust the header blindly. Power-inductor and outline packages are not Case Code - in values.

RR is three fields. Mouser always shows Power Rating, TCR, and Case Code; those extras belong on RX.

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
| Maximum Operating Temperature | `temp` | CE token is `105C`, not `+ 125 C` as a range end. |
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
| Maximum DC Current / Current Rating | `irms` or `irated` | One current on many rows. LP `irms`; LC/FB `irated`. |
| Saturation Current | `isat` | LP. Often absent. |
| DCR / Maximum DC Resistance | `dcr` | |
| Self Resonant Frequency / SRF | `srf` | |
| Q | `q` | LR. Atlas `Q50`. |
| Impedance | `zimp` / `zcm` | Beads `zimp`; common-mode `zcm`. Token `600R@100MHz`. |
| Number of Lines / Channels | `lines` | LC `2L` / `4L`. |
| Qualification | — | AEC-Q200. Shop rating. |

Mouser often lists a single Maximum DC Current. That does not fill both LP `isat` and `irms`.

## Diodes

[Diodes & Rectifiers](https://www.mouser.com/c/semiconductors/discrete-semiconductors/diodes-rectifiers/). Schottky, Zener, and LED Indication are subcategories.

| Mouser column | Atlas field | Notes |
|---|---|---|
| If - Forward Current / Ifs - Forward Current | `current` | DD/DS. |
| Vr Reverse Voltage / Vr - Reverse Voltage | `voltage` | DD/DS. |
| Vf Forward Voltage / Vf - Forward Voltage | `vf` | Shop column. Not on current DD/DS ID. |
| Zener Voltage | `voltage` | DZ. |
| Pd - Power Dissipation | `power` | DZ. |
| Zener Voltage Tolerance | `ztol` | Not on current DZ ID. |
| If / Vr / Vf | — | The rectifier trio. Atlas ID is `current`, `package`, `voltage`. |
| Package / Case | `package` | SOD123, SMA, SOD323. |
| LED Color | `color` | DL. |
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
| Rds On - Drain-Source Resistance | `rds` | Not on current MN/MP ID. |
| Vgs th - Gate-Source Threshold Voltage | `vgs` | Not on current MN/MP ID. |
| hFE - DC Current Gain | `hfe` | Not on current QN/QP ID. |
| Package / Case | `package` | SOT23, TO-92. |
| Transistor Polarity | — | N-Channel / P-Channel / NPN / PNP is the Key, not a field. |

## ICs

Still being specified. Key `IC` has zero fields. Mouser splits ICs under [Integrated Circuits](https://www.mouser.com/c/semiconductors/integrated-circuits-ics/).

| Mouser column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part Number | `device` | Candidate. |
| Package / Case | `package` | Candidate. |
| Number of Pins | `pins` | Candidate. |
| Product / Type | `type` | Candidate. Shop function, not an Atlas class. |

## Connectors

[Connectors](https://www.mouser.com/c/connectors/). Headers sit under rectangular / pin-header subcategories. Key `JJ` has zero fields.

| Mouser column | Atlas field | Notes |
|---|---|---|
| Connector Type / Product | `type` | Candidate. |
| Number of Positions | `pins` | Candidate. |
| Pitch | `pitch` | Candidate. |
| Mounting Style / Mounting Type | `mount` | Candidate. |
| Termination Style | `term` | Candidate. |
| Orientation | `orientation` | Straight / Right Angle. Candidate. |

Shop packaging, stock, and MPN stay out of Atlas.
