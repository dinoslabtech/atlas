# ICs

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order is device, package, pins.

| Key | Name | Fields |
|---|---|---|
| IC | Integrated circuit | device, package, pins |

Device examples: `LM358`, `ATMEGA328P`, `555`. Package: `SOIC8`, `QFN32`, `DIP8`, `TSSOP14`. Pins: `8`, `14`, `32`.

SOIC, QFN, DIP, and TSSOP are outlines. They are not drawn as EIA chips.

How distributors name these filters is in [houses](houses/).

## Specimens

| Key | ID | Name |
|---|---|---|
| IC | `IC-LM358-SOIC8-8` | `IC LM358 SOIC8 8` |

## Disagreements

- NOMENCLATURE examples such as `IC LM358 SOIC8` omit pin count. Atlas includes `pins`.
