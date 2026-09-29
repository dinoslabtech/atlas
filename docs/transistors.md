# Transistors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order comes from each subtype's examples.

Channel polarity lives in the Key. It is not a field.

| Key | Name | Fields |
|---|---|---|
| QN | BJT NPN | current, package, voltage |
| QP | BJT PNP | current, package, voltage |
| MN | MOSFET N-channel | current, package, voltage |
| MP | MOSFET P-channel | current, package, voltage |

SOT23 and PTH-TO92 are outlines. They are not drawn as EIA chips.

QP and MP have no distinct examples in NOMENCLATURE. They use the same field order as QN and MN.

## Specimens

| Key | ID | Name |
|---|---|---|
| QN | `QN-200mA-SOT23-40V` | `QN 200mA SOT23 40V` |
| QN | `QN-1A-PTH-TO92-60V` | `QN 1A PTH-TO92 60V` |
| MN | `MN-3A-SOT23-30V` | `MN 3A SOT23 30V` |

## Disagreements

- The generic transistor schema includes channel type. The Key already encodes it (`QN` vs `QP`, `MN` vs `MP`). Atlas omits a channel field.
- NOMENCLATURE used `200MA`. Atlas uses `200mA`.
