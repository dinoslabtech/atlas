# RS

Catalog filters live under [uk.rs-online.com](https://uk.rs-online.com). Column names below are the attribute headings on category and product pages. Atlas IDs use the field ids in `docs/`. Stock, price, RS Stock No., Mfr. Part No., Brand, Series, and packaging (Reel / Pack) are shop data. They are not Atlas ID fields.

**Automotive Standard / AEC-Q200** is a shop rating, not an Atlas ID field.

## Resistors

[Surface Mount Resistors](https://uk.rs-online.com/web/c/passive-components/fixed-resistors/surface-mount-resistors/).

| RS column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | RS `10 kΩ`. Atlas `10k`. |
| Tolerance | `tolerance` | RS `1 %`. Atlas `1%`. |
| Power Rating | `power` | RS `0.063 W`. Atlas `63mW`. RR does not carry power. |
| Package/Case | `package` | EIA `0402`, `0603`, `0805`. |
| Technology | `tech` | Thick Film / Thin Film → RX `TK` / `TN`. Wirewound is class RW. |
| Temperature Coefficient | `tcr` | RS `±100 ppm/°C`. Atlas `100ppm`. |
| Voltage | `voltage` | Shop working voltage. Not on RR/RX ID. |
| Minimum / Maximum Operating Temperature | — | Not an Atlas resistor field. |
| Automotive Standard | — | AEC-Q200. Shop rating. |
| Resistor Type | — | General Purpose, Current Sense. Current Sense selects class RS. |
| Termination | `term` | 2-terminal / 4-terminal → RS `2T` / `4T`. |
| Number of Resistors / Circuit | `count` / `config` | RN. Isolated / Bussed → `ISO` / `BUS`. |

RR is three fields. RS always shows Power Rating, Technology, and Temperature Coefficient; those extras belong on RX.

## Capacitors

[MLCCs - Multilayer Ceramic Capacitors](https://uk.rs-online.com/web/c/passive-components/capacitors/mlccs-multilayer-ceramic-capacitors/). This is the house RS is strongest on for Atlas CC.

| RS column | Atlas field | Notes |
|---|---|---|
| Capacitance | `capacitance` | RS `100 nF`. Atlas `100nF`. |
| Tolerance | `tolerance` | |
| Dielectric | `dielectric` | C0G, X7R, X5R (also NP0 as a C0G alias). |
| Voltage / VR / Voltage Rating | `voltage` | RS often labels this **VR**. Atlas `50V`. |
| Case Size / Package/Case | `package` | EIA `0402`, `0603`, `0805`, `1206`. |
| Equivalent Series Resistance | `esr` | CE/CT/CS, not typical on MLCC. |
| Ripple Current | `ripple` | CE. |
| Maximum Operating Temperature | `temp` | CE token `105C`. |
| Capacitor Type | `subtype` | Aluminum / Polymer / Hybrid; MnO2 / Polymer. |
| Case Code | `case` | Tantalum A–E (CT). |
| Dielectric Material | `film` | PP, PET, PPS on CF. |
| Automotive Standard | — | AEC-Q200. Shop rating. |

**VR vs `voltage`.** RS product attributes use VR / Voltage / Voltage Rating for the same figure. Atlas has one field, `voltage`.

Electrolytic, tantalum, film, and supercapacitor sit in sibling capacitor categories under [Capacitors](https://uk.rs-online.com/web/c/passive-components/capacitors/).

## Inductors

[Surface Mount Inductors](https://uk.rs-online.com/web/c/passive-components/inductors/surface-mount-inductors/).

| RS column | Atlas field | Notes |
|---|---|---|
| Inductance | `inductance` | |
| Tolerance | `tolerance` | Name glues `±`. |
| Package/Case | `package` | EIA for LL/LR/FB. LP uses power footprints. |
| Maximum Self Resonant Frequency | `srf` | |
| Shielded / Inductor Construction | `shield` | Shielded → `SH`. Unshielded / No → `UN`. |
| Maximum DC Current | `irms` or `irated` | One current on many rows. |
| Saturation Current | `isat` | LP. Often absent. |
| Maximum DC Resistance | `dcr` | |
| Q Factor | `q` | LR. |
| Impedance | `zimp` / `zcm` | Beads / common-mode. |
| Number of Lines | `lines` | LC. |
| Automotive Standard | — | AEC-Q200. Shop rating. |

A single Maximum DC Current does not fill both LP `isat` and `irms`.

## Diodes

[Schottky Diodes & Rectifiers](https://uk.rs-online.com/web/c/semiconductors/discrete-semiconductors/schottky-diodes-rectifiers/). Standard rectifiers, Zeners, and LEDs are sibling categories.

| RS column | Atlas field | Notes |
|---|---|---|
| Maximum Continuous Forward Current | `current` | DD/DS. |
| Peak Reverse Repetitive Voltage / VR | `voltage` | DD/DS. RS reuses **VR** here. |
| Forward Voltage / VF | `vf` | Shop column. Not on current DD/DS ID. |
| Package Type / Package/Case | `package` | SOD-123, SMA, SOD-323. |
| Zener Voltage | `voltage` | DZ. |
| Power Dissipation | `power` | DZ. |
| Voltage Tolerance | `ztol` | Not on current DZ ID. |
| LED Colour | `color` | DL. |
| Automotive Standard | — | AEC-Q101. Shop rating. |

Diode Configuration (Single / Dual) is not an Atlas field.

## Transistors

MOSFET and bipolar categories under Discrete Semiconductors.

| RS column | Atlas field | Notes |
|---|---|---|
| Continuous Drain Current | `current` | MN/MP. |
| Collector Current | `current` | QN/QP. |
| Drain Source Voltage | `voltage` | MN/MP. |
| Collector Emitter Voltage | `voltage` | QN/QP. |
| Package Type | `package` | SOT-23, TO-92. |
| Drain Source On-State Resistance | `rds` | Not on current MN/MP ID. |
| Gate Source Threshold Voltage | `vgs` | Not on current MN/MP ID. |
| DC Current Gain | `hfe` | Not on current QN/QP ID. |
| Channel Type / Transistor Type | — | The Key, not a field. |
| Automotive Standard | — | AEC-Q101. Shop rating. |

## ICs

Still being specified. Key `IC` has zero fields. RS splits ICs by function under Semiconductors.

| RS column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part No / Description | `device` | Candidate. |
| Package Type | `package` | Candidate. |
| Pin Count | `pins` | Candidate. |
| IC Type | `type` | Candidate. |
| Automotive Standard | — | AEC-Q100. Shop rating. |

## Connectors

Pin headers and rectangular connectors under Connectors. Key `JJ` has zero fields.

| RS column | Atlas field | Notes |
|---|---|---|
| Connector Type / Type | `type` | Candidate. |
| Number of Contacts | `pins` | Candidate. |
| Pitch | `pitch` | Candidate. `2.54 mm`. |
| Mounting Type | `mount` | Candidate. |
| Termination Method | `term` | Candidate. |
| Body Orientation | `orientation` | Straight / Right Angle. Candidate. |

Shop packaging, stock, and MPN stay out of Atlas.
