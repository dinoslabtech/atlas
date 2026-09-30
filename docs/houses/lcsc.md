# LCSC

Catalog filters live under [lcsc.com/category](https://www.lcsc.com/). Column names below are the table headings on those category pages and the **Products Specifications** block on a part. Atlas IDs use the field ids in `docs/`. Stock, price, MPN, LCSC Part #, Date Code, and Packaging (Tape & Reel vs bag) are shop data. They are not Atlas ID fields.

AEC-Q200 in a description line is a shop rating, not an Atlas ID field.

## Resistors

[Chip Resistor - Surface Mount](https://www.lcsc.com/category/1199.html).

| LCSC column | Atlas field | Notes |
|---|---|---|
| Package | `package` | Size codes `0402`, `0603`, `0805`, `1206`, `2512`. This is the Atlas EIA token. |
| Resistance | `resistance` | LCSC `10kΩ` / `4.7Ω`. Atlas `10k` / `4R7`. |
| Tolerance | `tolerance` | Table shows `±1%` / `±5%`. MPN letter: **F** = 1%, **J** = 5% (YAGEO/Uni-Royal style). Atlas stores the percent, not the letter. |
| Power(Watts) | `power` | Datasheet rating is **at 70°C**. LCSC `62.5mW` / `100mW`. Atlas `63mW` / `100mW`. On RR, RX, RW, RS, RN. |
| Temperature Coefficient | `tcr` | LCSC `±100ppm/℃`. Atlas `100ppm`. Also written T.C.R. |
| Type | `tech` | Thick Film Resistor / Thin Film Resistor → RX `TK` / `TN`. Current Sense Resistor is class RS, not tech. |
| Voltage Rating | `voltage` | Atlas `50V`. On RR, RX, RW, RS. |
| Operating Temperature | — | Not an Atlas resistor field. |

**Tolerance letter vs percent.** LCSC (and the MPN) encode tolerance as F/J/G/B. Atlas `tolerance` is `1%`, `5%`. Map the letter, do not put `F` in the ID.

**Power at 70°C.** Shop Power(Watts) is the 70°C rating. Atlas `power` is that same figure in `mW`/`W`. Derating curves are not an Atlas field.

RR is five fields (`resistance`, `tolerance`, `package`, `power`, `voltage`). TCR and tech stay on RX.

## Capacitors

[Ceramic Capacitors](https://www.lcsc.com/category/1142.html). Aluminum electrolytic, tantalum, film, and supercapacitor sit in sibling capacitor categories.

| LCSC column | Atlas field | Notes |
|---|---|---|
| Capacitance | `capacitance` | LCSC `100nF` / `10uF`. Same shape as Atlas. |
| Tolerance | `tolerance` | |
| Package | `package` | Size codes `0402` / `0603` / `0805` for CC. |
| Voltage Rating | `voltage` | LCSC `50V`. Atlas `50V`. |
| Temperature Coefficient | `dielectric` | C0G, X7R, X5R, X7S, Y5V. This is **not** resistor TCR. |
| Equivalent Series Resistance | `esr` | CE/CT/CS. |
| Ripple Current | `ripple` | CE. |
| Operating Temperature | `temp` | Grade token `105C`, not the full range. On CC, CE, CT, CF. |
| Type | `subtype` | Aluminum / Polymer / Hybrid; MnO2 / Polymer. |
| Case / Size | `case` | Tantalum A–E (CT). |
| Dielectric / Material | `film` | PP, PET, PPS on CF. |

**Disagreement.** LCSC names the MLCC dielectric **Temperature Coefficient**, same as DigiKey. Atlas calls it `dielectric`.

## Inductors

[Inductors, Coils, Chokes](https://www.lcsc.com/category/498.html). Beads: [Ferrite Beads and Chips](https://www.lcsc.com/category/1170.html).

| LCSC column | Atlas field | Notes |
|---|---|---|
| Inductance | `inductance` | |
| Tolerance | `tolerance` | Name glues `±`. |
| Package | `package` | Size codes for chip inductors and beads. LP uses power footprints. |
| Self-Resonant Frequency | `srf` | |
| Shielded / Unshielded | `shield` | `SH` / `UN`. |
| Saturation Current | `isat` | LP. |
| Current Rating / Rated Current | `irms` or `irated` | LP `irms`; LC/FB `irated`. |
| DC Resistance(DCR) | `dcr` | |
| Q @ Frequency | `q` | LR. |
| Impedance @ Frequency | `zimp` / `zcm` | Beads `zimp` (`600Ω@100MHz` → `600R@100MHz`). Common-mode `zcm`. |
| Number of Circuits / Lines | `lines` | LC `2L` / `4L`. |

One Current Rating column does not fill both LP `isat` and `irms`.

## Diodes

Diodes sit under Discrete Semiconductors (rectifiers, Schottky, Zener, LED).

| LCSC column | Atlas field | Notes |
|---|---|---|
| Average Rectified Current / If | `current` | DD/DS. |
| Reverse Voltage / Vr | `voltage` | DD/DS. |
| Forward Voltage / Vf | `vf` | Atlas `0V7`, `0V3`, `2V0`. On DD, DS, DL. |
| Zener Voltage | `voltage` | DZ. |
| Power Dissipation | `power` | DZ. |
| Zener Tolerance | `ztol` | Atlas `2%`, `5%`. On DZ. |
| Color / Emitted Color | `color` | DL. |
| Package | `package` | SOD123, SMA, SOD323, 0603. |

Type (Standard / Schottky / Zener / LED) selects class DD / DS / DZ / DL.

## Transistors

[Single FETs, MOSFETs](https://www.lcsc.com/category/874.html). [Single Bipolar Transistors](https://www.lcsc.com/category/1425.html).

| LCSC column | Atlas field | Notes |
|---|---|---|
| Drain Current / Id / Ic | `current` | |
| Drain-Source Voltage / Vds / Vceo | `voltage` | |
| Package | `package` | SOT23, TO-92. |
| Type (N-Channel / P-Channel / NPN / PNP) | — | The Key, not a field. |
| Rds On | `rds` | Atlas `20mR`. On MN, MP. |
| Vgs(th) | `vgs` | Atlas `2V5`. On MN, MP. |
| DC Current Gain / hFE | `hfe` | Atlas `100`. On QN, QP. |

## ICs

Key `IC` Fields are `device`, `package`, `pins`. Specimen `IC-LM358-SOIC8-8`. LCSC splits ICs by function.

| LCSC column | Atlas field | Notes |
|---|---|---|
| MPN / Description | `device` | Chip name, e.g. `LM358`. |
| Package | `package` | `SOIC-8` → Atlas `SOIC8`. |
| Number of Pins / Pin Count | `pins` | Atlas `8`, `14`, `32`. |
| Type / Category | — | Shop taxonomy. Atlas has one Class. |

## Connectors

[Headers, Receptacles, Female Sockets](https://www.lcsc.com/category/793.html). Key `JJ` Fields are `type`, `pins`, `pitch`, `orientation`, `mount`. Specimen `JJ-HDR-1x10-2.54mm-VERT-PTH`.

| LCSC column | Atlas field | Notes |
|---|---|---|
| Connector Type | `type` | Atlas `HDR`, `USBC`, `RJ45`, `TB`. |
| Number of PINs / Number of Positions | `pins` | Atlas `1x10`, `1x8`, `2x5`, `2PIN`. Shop `1x10P` is the same pins token. |
| Pitch / Hole/Pin Spacing | `pitch` | Atlas `2.54mm`. |
| Mounting Type | `mount` | Through Hole / Surface Mount → `PTH` / `SMD`. |
| Orientation | `orientation` | Top / Vertical → `VERT`. Right Angle → `RA`. |
| Package | — | LCSC often puts `Through Hole,P=2.54mm` here. That is mount + pitch, not an Atlas package code. |

Shop packaging, stock, and MPN stay out of Atlas.
