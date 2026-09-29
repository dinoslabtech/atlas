# Diodes

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order comes from each subtype's examples, written as Key / ID / Name.

NOMENCLATURE used mixed case (`150MA`, `500MW`, `PTH-3MM`). Atlas uses the passive ASCII style: `150mA`, `500mW`, `PTH-3mm`.

| Key | Name | Fields |
|---|---|---|
| DD | Standard diode | current, package, voltage |
| DS | Schottky | current, package, voltage |
| DZ | Zener | voltage, package, power |
| DL | LED | color, package |

Zener is voltage-first. SOD, SMA, and SOD323 are outline packages and are not drawn as EIA chips. DL includes `0603`, so the chip size drawing is shown for LEDs.

## Specimens

| Key | ID | Name |
|---|---|---|
| DD | `DD-150mA-SOD123-100V` | `DD 150mA SOD123 100V` |
| DS | `DS-1A-SMA-40V` | `DS 1A SMA 40V` |
| DZ | `DZ-12V-SOD323-500mW` | `DZ 12V SOD323 500mW` |
| DL | `DL-RED-0603` | `DL RED 0603` |
| DL | `DL-BLUE-PTH-3mm` | `DL BLUE PTH-3mm` |

## Disagreements

- The generic diode schema in NOMENCLATURE has a trailing Note. No example uses it. Atlas omits Note.
- NOMENCLATURE LED examples are RED and BLUE. `DinosLab_Led.pretty` also has GREEN, YELLOW, WHITE, RGB. Atlas seeds RED and BLUE.
