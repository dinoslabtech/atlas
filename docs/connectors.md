# Connectors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order is type, pins, pitch, orientation, mount.

Distributor filter names live in [houses](houses/).

Type is a field. There is one Key (`JJ`).

| Key | Name | Fields |
|---|---|---|
| JJ | Connector | type, pins, pitch, orientation, mount |

Type: `HDR` pin header, `USBC` USB-C, `RJ45`, `TB` terminal block. Pins: `1x10`, `1x8`, `2x5`, `2PIN`. Pitch: `2.54mm`, `1.27mm`, `5.08mm`. Orientation: `VERT` vertical, `RA` right-angle. Mount: `PTH`, `SMD`.

USB-C uses type `USBC`. The other fields stay `X`.

Headers are outlines. They are not drawn as EIA chips.

## Specimens

| Key | ID | Name |
|---|---|---|
| JJ | `JJ-HDR-1x10-2.54mm-VERT-PTH` | `JJ HDR 1x10 2.54mm VERT PTH` |
| JJ | `JJ-USBC-X-X-X-X` | `JJ USBC X X X X` |

## Disagreements

- NOMENCLATURE used `1X10` and `2.54MM`. Atlas uses `1x10` and `2.54mm`.
- USB-C is written `USBC` so a hyphen is not a field break.
