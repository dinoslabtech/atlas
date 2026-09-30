# Inductors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/Inductors.md` and `components/passive/inductors.yaml`.

Tolerance in the Name is prefixed with `±` and glued to the previous token.

| Key | Name | Fields |
|---|---|---|
| LL | Signal / general purpose | inductance, tolerance, package, srf, shield, irated |
| LP | Power inductor | inductance, tolerance, package, isat, irms, dcr, shield |
| LR | RF inductor | inductance, tolerance, package, srf, q |
| LC | Common mode choke | inductance, tolerance, package, zcm, irated, dcr, lines |
| FB | Ferrite bead | zimp, package, irated, dcr, z1g |

LP packages (`2520`, `3015`, `4020`, `5020`, `6028`) are power-inductor footprints. They are not drawn as EIA chips. FB has no tolerance field.

Chip EIA examples include `01005`, `0201`, `0402`, `0603`, `0805`, `1206`, `1210`, `1808`, `1812`. `01005` is not on the chip size drawing. LC also uses metric codes (`2012`, `3216`, `4532`).

Shield: `SH`, `UN`. Lines: `2L`, `4L`. Impedance: `120R@100MHz`, `600R@100MHz`, `1kR@100MHz`. Z at 1 GHz: `1kR@1GHz`. SRF: `50MHz`, `500MHz`, `1G0`, `2G4`, `10GHz`. Current: `50mA`, `350mA`, `500mA`, `1A`, `3A`, `15A`. DCR: `10mR`, `80mR`, `1R2`.

Derived values are not part of the ID. Energy is `0.5*L*I^2` when inductance and a current (`isat`, else `irms`, else `irated`) are set. Copper drop is `I*DCR`. Ferrite beads use `irated` and `dcr`.

Distributor filter names live in [Houses](houses/).

## Specimens

| Key | ID | Name |
|---|---|---|
| LL | `LL-100nH-5%-0402-500MHz-SH-500mA` | `LL 100nH±5% 0402 500MHz SH 500mA` |
| LP | `LP-4u7-20%-5020-3A-2A-80mR-SH` | `LP 4u7±20% 5020 3A 2A 80mR SH` |
| LR | `LR-2n2-2%-0402-2G4-Q50` | `LR 2n2±2% 0402 2G4 Q50` |
| LC | `LC-4m7-20%-3216-600R@100MHz-500mA-500mR-2L` | `LC 4m7±20% 3216 600R@100MHz 500mA 500mR 2L` |
| FB | `FB-600R@100MHz-0402-500mA-200mR-1kR@1GHz` | `FB 600R@100MHz 0402 500mA 200mR 1kR@1GHz` |

## Disagreements

- The LL summary table includes Q. The detailed LL ID and the YAML omit Q. Atlas omits Q.
- The LP field table and YAML include core type. The detailed LP ID and example omit it. Atlas omits core.
- LC YAML adds `shield` and spells `impedence`. The detailed ID has no shield. Atlas omits shield and uses `zcm` / `zimp`.
