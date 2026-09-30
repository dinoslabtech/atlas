# DigiKey

Catalog filters live under [digikey.com/en/products/filter](https://www.digikey.com/en/products/filter). Column names below are the parametric headings DigiKey prints on those tables. Atlas IDs use the field ids in `docs/` (`resistance`, `package`, `tech`, …). Stock, price, Mfr Part #, Digi-Key Part #, Series, Package (Tape & Reel / Cut Tape / Digi-Reel), and Product Status are shop data. They are not Atlas ID fields.

AEC-Q200 (and AEC-Q101) sit in **Ratings** / **Qualification**. That is a shop rating, not an Atlas ID field.

## Resistors

[Chip Resistor - Surface Mount](https://www.digikey.com/en/products/filter/chip-resistor-surface-mount/52). Networks: [Resistor Networks, Arrays](https://www.digikey.com/en/products/filter/resistor-networks-arrays/50). Current-sense parts usually stay in the chip-resistor table with **Features** containing Current Sense.

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Resistance | `resistance` | DigiKey uses Ω / kOhms. Atlas uses `10k`, `4R7`, `10mR`. |
| Tolerance | `tolerance` | DigiKey `±1%`. Atlas `1%`. |
| Power (Watts) | `power` | DigiKey `0.063W, 1/16W`. Atlas `63mW`. On RR, RX, RW, RS, RN. |
| Package / Case | `package` | `0402 (1005 Metric)` → Atlas `0402`. Drop the metric parenthetical. |
| Supplier Device Package | `package` | Often the EIA code (`0402`). Prefer this when Package / Case is a JEDEC outline. |
| Temperature Coefficient | `tcr` | DigiKey `±100ppm/°C`. Atlas `100ppm`. RX, RW, RS, RN. |
| Composition | `tech` | See disagreement below. |
| Number of Terminations | `term` | `2` / `4` → Atlas `2T` / `4T` (RS). |
| Features: Non-Inductive | `winding` | Atlas `NI` vs `STD` (RW). DigiKey has no winding column. |
| Circuit Type | `config` | Isolated / Bussed → Atlas `ISO` / `BUS` (RN). |
| Number of Resistors | `count` | RN element count. |
| Voltage - Rated | `voltage` | Atlas `50V`. On RR, RX, RW, RS, RN. |
| Operating Temperature | — | Not an Atlas resistor field. |
| Features: Automotive AEC-Q200 | — | Shop rating. |
| Ratings | — | Shop rating. |

**Disagreement — Composition vs `tech`.** DigiKey Composition is Thick Film, Thin Film, Wirewound, Metal Foil, Metal Film, Metal Element, Carbon Film, Carbon Composition. Atlas `tech` is only `TK` (thick film) and `TN` (thin film), and only on RX. Wirewound is class `RW` (`winding`), not a tech token. Foil, metal element, and carbon have no Atlas token. Do not copy Composition strings into an ID.

RR is five fields (`resistance`, `tolerance`, `package`, `power`, `voltage`). TCR and tech stay on RX.

## Capacitors

[Ceramic Capacitors](https://www.digikey.com/en/products/filter/ceramic-capacitors/60). Also [Aluminum Electrolytic Capacitors](https://www.digikey.com/en/products/filter/aluminum-electrolytic-capacitors/58), [Tantalum Capacitors](https://www.digikey.com/en/products/filter/tantalum-capacitors/73), [Film Capacitors](https://www.digikey.com/en/products/filter/film-capacitors/64), [Electric Double Layer Capacitors (EDLC), Supercapacitors](https://www.digikey.com/en/products/filter/electric-double-layer-capacitors-edlc-supercapacitors/61).

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Capacitance | `capacitance` | DigiKey `0.1 µF`. Atlas `100nF`. |
| Tolerance | `tolerance` | |
| Package / Case | `package` | EIA chip for CC (`0402 (1005 Metric)` → `0402`). CE cans are not EIA chips. |
| Voltage - Rated | `voltage` | |
| Temperature Coefficient | `dielectric` | C0G, X7R, X5R, X7S, Y5V on MLCC. This is **not** resistor TCR. |
| ESR (Equivalent Series Resistance) | `esr` | CE/CT/CS. Atlas `100mR`. |
| Ripple Current | `ripple` | CE. Atlas `500mA`. |
| Operating Temperature | `temp` | Grade token `85C` / `105C` / `125C`, not the full −55°C ~ 125°C span. On CC, CE, CT, CF. |
| Thickness (Max) | `thickness` | MLCC body height. Atlas `0.5mm`, `0.8mm`. On CC only. |
| Lifetime @ Temp | `lifetime` | CE hours token (`2000h`, `5000h`). Separate from `temp`. |
| Polarization / Capacitor Type | `subtype` | Aluminum / Polymer / Hybrid → CE `AL` / `ALP` / `ALH`. MnO2 / Polymer → CT `MNO2` / `POLY`. |
| Size / Dimension, Height | `case` | Tantalum case letters A–E are Atlas `case` (CT), not `package`. |
| Dielectric Material | `film` | Polypropylene / Polyester / PPS → CF `PP` / `PET` / `PPS`. |
| Features | — | Soft termination, high Q, AEC-Q200. Not Atlas ID. |

**Disagreement.** DigiKey names the MLCC dielectric **Temperature Coefficient**. Atlas calls it `dielectric`. Do not map that column to `tcr`.

## Inductors

[Fixed Inductors](https://www.digikey.com/en/products/filter/fixed-inductors/71). Beads: [Ferrite Beads and Chips](https://www.digikey.com/en/products/filter/ferrite-beads-and-chips/841). Common-mode: [Common Mode Chokes](https://www.digikey.com/en/products/filter/common-mode-chokes/839).

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Inductance | `inductance` | DigiKey `4.7 µH`. Atlas `4u7`. |
| Tolerance | `tolerance` | Name glues `±` (`100nH±5%`). |
| Package / Case | `package` | EIA for LL/LR/FB. Power footprints (`5020`) are not drawn as EIA chips. |
| Frequency - Self Resonant | `srf` | DigiKey `500 MHz`. Atlas `500MHz` / `2G4`. |
| Shielding | `shield` | Shielded / Unshielded → `SH` / `UN`. Semi-Shielded is not an Atlas token. |
| Current Rating (Amps) | `irms` or `irated` | One column. LP uses it as `irms`; LL/LC/FB as `irated`. |
| Current - Saturation (Isat) | `isat` | LP. Often missing on signal/RF rows. |
| DC Resistance (DCR) | `dcr` | Atlas `80mR`. |
| Q @ Freq | `q` | LR only. Atlas `Q50`. LL does not carry Q. |
| Impedance @ Frequency | `zimp` / `zcm` | Beads → `zimp` (`600R@100MHz`). Common-mode impedance → `zcm`. |
| Number of Lines | `lines` | `2` / `4` → `2L` / `4L` (LC). |
| Ratings | — | AEC-Q200. Shop rating. |

DigiKey does not split Irms and Isat on every row. A single Current Rating is not enough to fill both LP fields; leave the missing one `X`.

## Diodes

[Diodes - Rectifiers - Single](https://www.digikey.com/en/products/filter/diodes-rectifiers-single/136). [Diodes - Zener - Single](https://www.digikey.com/en/products/filter/diodes-zener-single/178). [LED Indication - Discrete](https://www.digikey.com/en/products/filter/led-indication-discrete/105).

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Current - Average Rectified (Io) | `current` | DD/DS. DigiKey `150mA`. |
| Voltage - DC Reverse (Vr) (Max) | `voltage` | DD/DS reverse voltage. |
| Voltage - Zener (Nom) (Vz) | `voltage` | DZ is voltage-first. |
| Power - Max | `power` | DZ. Atlas `500mW`. |
| Voltage - Forward (Vf) (Max) @ If | `vf` | Atlas `0V7`, `0V3`, `2V0`. On DD, DS, DL. |
| Tolerance | `ztol` | Zener Vz tolerance. Atlas `2%`, `5%`. On DZ. |
| Color | `color` | DL. Atlas seeds `RED`, `BLUE`, `GREEN`, `YELLOW`, `WHITE`. |
| Package / Case, Supplier Device Package | `package` | SOD123, SMA, SOD323, 0603, PTH-3mm. Outlines are not EIA chips. |
| Diode Type / Technology | — | Standard vs Schottky selects class DD vs DS. Not a field. |
| Qualification | — | AEC-Q101. Shop rating. |

Vr / If / Vf are the usual rectifier trio. Atlas DD/DS ID is `current`, `package`, `voltage`, `vf`.

## Transistors

[Transistors - Bipolar (BJT) - Single](https://www.digikey.com/en/products/filter/transistors-bipolar-bjt-single/276). [Transistors - FETs, MOSFETs - Single](https://www.digikey.com/en/products/filter/transistors-fets-mosfets-single/278).

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Current - Collector (Ic) (Max) | `current` | QN/QP. |
| Current - Continuous Drain (Id) @ 25°C | `current` | MN/MP. |
| Voltage - Collector Emitter Breakdown (Max) | `voltage` | QN/QP. |
| Drain to Source Voltage (Vdss) | `voltage` | MN/MP. |
| Package / Case, Supplier Device Package | `package` | SOT23, PTH-TO92. Outlines, not EIA chips. |
| FET Type | — | N-Channel / P-Channel is the Key (`MN` / `MP`), not a field. |
| Transistor Type | — | NPN / PNP is the Key (`QN` / `QP`), not a field. |
| Rds On (Max) @ Id, Vgs | `rds` | Atlas `20mR`. On MN, MP. |
| Vgs(th) (Max) @ Id | `vgs` | Atlas `2V5`. On MN, MP. |
| DC Current Gain (hFE) (Min) @ Ic, Vce | `hfe` | Atlas `100`. On QN, QP. |

Channel polarity lives in the Key. Do not add a channel field from FET Type.

## ICs

Key `IC` Fields are `device`, `package`, `pins`. Specimen `IC-LM358-SOIC8-8`. DigiKey splits ICs by function (op amps, MCUs, regulators, …), not as one family.

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Manufacturer Part Number / Description | `device` | Chip name, e.g. `LM358`. Not the shop MPN (`LM358DR`). |
| Supplier Device Package | `package` | `SOIC-8` → Atlas `SOIC8`. |
| Number of Pins / Number of Terminations | `pins` | Atlas `8`, `14`, `32`. |
| Type / Amplifier Type / Function | — | Shop taxonomy. Atlas has one Class. |

## Connectors

[Rectangular Connectors - Headers, Male Pins](https://www.digikey.com/en/products/filter/rectangular-connectors-headers-male-pins/314). Key `JJ` Fields are `type`, `pins`, `pitch`, `orientation`, `mount`. Specimen `JJ-HDR-1x10-2.54mm-VERT-PTH`. USB-C is type `USBC` with the other Fields `X`.

| DigiKey column | Atlas field | Notes |
|---|---|---|
| Connector Type | `type` | Atlas `HDR`, `USBC`, `RJ45`, `TB`. |
| Number of Positions | `pins` | Atlas `1x10`, `1x8`, `2x5`, `2PIN`. |
| Pitch - Mating | `pitch` | DigiKey `0.100" (2.54mm)`. Atlas `2.54mm`. |
| Mounting Type | `mount` | Through Hole / Surface Mount → `PTH` / `SMD`. |
| Termination | — | Solder, Press-Fit, Crimp. Not an Atlas Field. Not RS shunt `2T`/`4T`. |
| Orientation | `orientation` | Straight / Right Angle → `VERT` / `RA`. |
| Number of Rows | — | Encoded in `pins` (`1x10` vs `2x5`). |

Shop packaging, stock, and MPN stay out of Atlas.
