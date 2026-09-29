# Transistors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order comes from each subtype's examples.

Channel polarity lives in the Key. It is not a field.

Distributor filter names: [houses](houses/README.md).

| Key | Name | Fields |
|---|---|---|
| QN | BJT NPN | current, package, voltage, hfe, power |
| QP | BJT PNP | current, package, voltage, hfe, power |
| MN | MOSFET N-channel | current, package, voltage, rds, vgs |
| MP | MOSFET P-channel | current, package, voltage, rds, vgs |

SOT23 and PTH-TO92 are outlines. They are not drawn as EIA chips.

QP and MP have no distinct examples in NOMENCLATURE. They use the same field order as QN and MN.

hFE tokens: `100`, `300`. Power: `250mW`, `1W`. Rds: `20mR`, `100mR`. Vgs: `2V5`, `4V5`.

Derived values are not part of the ID. BJT: if current, voltage, and power are set, dissipation estimate is Ic * V, shown next to the power rating. MOSFET: conduction loss is Id^2 * Rds.

## Specimens

| Key | ID | Name |
|---|---|---|
| QN | `QN-200mA-SOT23-40V-100-250mW` | `QN 200mA SOT23 40V 100 250mW` |
| QN | `QN-1A-PTH-TO92-60V-100-250mW` | `QN 1A PTH-TO92 60V 100 250mW` |
| QP | `QP-200mA-SOT23-40V-100-250mW` | `QP 200mA SOT23 40V 100 250mW` |
| MN | `MN-3A-SOT23-30V-20mR-2V5` | `MN 3A SOT23 30V 20mR 2V5` |
| MP | `MP-3A-SOT23-30V-20mR-2V5` | `MP 3A SOT23 30V 20mR 2V5` |

## Disagreements

- The generic transistor schema includes channel type. The Key already encodes it (`QN` vs `QP`, `MN` vs `MP`). Atlas omits a channel field.
- NOMENCLATURE used `200MA`. Atlas uses `200mA`.
- NOMENCLATURE examples stop at current, package, voltage. Atlas appends hFE and power on QN/QP, and Rds and Vgs on MN/MP.
