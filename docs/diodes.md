# Diodes

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/NOMENCLATURE.md`. There is no Resistors-style field document. Field order comes from each subtype's examples, written as Key / ID / Name.

NOMENCLATURE used mixed case (`150MA`, `500MW`, `PTH-3MM`). Atlas uses the passive ASCII style: `150mA`, `500mW`, `PTH-3mm`.

Distributor filter names live in [Houses](houses/).

| Key | Name | Fields |
|---|---|---|
| DD | Standard diode | current, package, voltage, vf |
| DS | Schottky | current, package, voltage, vf |
| DZ | Zener | voltage, package, power, ztol |
| DL | LED | color, package, current, vf |

Zener is voltage-first. SOD, SMA, and SOD323 are outline packages and are not drawn as EIA chips. DL includes `0603`, so the chip size drawing is shown for LEDs. `chip-package` stays on the DL package field.

Vf tokens use `V` as the decimal mark (`0V7`, `0V3`, `2V0`), the same idea as `R` on resistors. DD vf examples: `0V7`, `1V1`. DS: `0V3`, `0V45`. DL: `2V0`, `3V3`. DZ ztol examples: `2%`, `5%`.

DD, DS, and DL derive Pd = If * Vf. DZ derives Izmax = P / Vz. Derived values are not part of the ID.

## Specimens

| Key | ID | Name |
|---|---|---|
| DD | `DD-150mA-SOD123-100V-0V7` | `DD 150mA SOD123 100V 0V7` |
| DS | `DS-1A-SMA-40V-0V3` | `DS 1A SMA 40V 0V3` |
| DZ | `DZ-12V-SOD323-500mW-5%` | `DZ 12V SOD323 500mW 5%` |
| DL | `DL-RED-0603-20mA-2V0` | `DL RED 0603 20mA 2V0` |
| DL | `DL-BLUE-PTH-3mm-20mA-2V0` | `DL BLUE PTH-3mm 20mA 2V0` |

## Disagreements

- The generic diode schema in NOMENCLATURE has a trailing Note. No example uses it. Atlas omits Note.
- NOMENCLATURE LED examples are RED and BLUE. `DinosLab_Led.pretty` also has GREEN, YELLOW, WHITE, RGB. Atlas seeds RED, BLUE, GREEN, YELLOW, WHITE. RGB is omitted.
