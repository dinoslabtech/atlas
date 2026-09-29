# Capacitors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/Capacitors.md` and `components/passive/capacitors.yaml`.

Field order is the detailed `ID:` template for each class. New slots are appended; the old prefix stays. Distributor filter names live in `docs/houses/`.

| Key | Name | Fields |
|---|---|---|
| CC | Ceramic (MLCC) | capacitance, tolerance, package, voltage, dielectric, temp |
| CE | Electrolytic | capacitance, tolerance, package, voltage, esr, ripple, temp, subtype, lifetime |
| CT | Tantalum / polymer-tantalum | capacitance, tolerance, case, voltage, esr, subtype, temp |
| CF | Film | capacitance, tolerance, package, voltage, film, temp |
| CS | Supercapacitor / EDLC | capacitance, tolerance, package, voltage, esr |

CE and CT packages are can sizes and case letters. They are not drawn as EIA chips. CF and CS may use an EIA code (`1210`) or a THT token (`THT5mm`, `THT10x30`); the chip drawing is shown because `1210` is on the draw list.

CC voltage examples append `6V3` and `25V`. Dielectric examples append `X6S` and `NP0`. `NP0` is the same Class I body as `C0G`. CC and CT default temp is `125C`. CF defaults to `85C`. CE keeps its eight fields and appends lifetime; examples `2000h`, `5000h`, default `2000h`. CS keeps five fields and only adds example tokens.

## Specimens

| Key | ID | Name |
|---|---|---|
| CC | `CC-100nF-10%-0402-50V-X7R-125C` | `CC 100nF 10% 0402 50V X7R 125C` |
| CE | `CE-100uF-20%-0810-35V-100mR-500mA-105C-AL-2000h` | `CE 100uF 20% 0810 35V 100mR 500mA 105C AL 2000h` |
| CT | `CT-10uF-10%-B-16V-300mR-MNO2-125C` | `CT 10uF 10% B 16V 300mR MNO2 125C` |
| CF | `CF-100nF-5%-THT5mm-250V-PP-85C` | `CF 100nF 5% THT5mm 250V PP 85C` |
| CS | `CS-1F-20%-THT10x30-2V5-100mR` | `CS 1F 20% THT10x30 2V5 100mR` |

The CC prefix `CC-100nF-10%-0402-50V-X7R` is unchanged. Temp fills the last slot.

Subtype tokens for CE: `AL`, `ALP`, `ALH`. For CT: `MNO2`, `POLY`.

## Derived

Not part of the ID. From the selected tokens and ambient temperature:

- Energy `0.5*C*V^2` and charge `C*V`. `100nF` at `50V` is `125uJ` and `5uC`.
- EIA C(T), interpolated linearly from 25C to the band edge, shown as C at ambient. `C0G` / `NP0` stay at the 25C value. `X7R` is ±15% over -55C to 125C. `X5R` is ±15% over -55C to 85C. `Y5V` is +22/-82 over -30C to 85C.

## Disagreements

- The CE `ID:` template line omits subtype. The field table, the worked example, and the YAML include it. Atlas seeds subtype so the example is representable.
- CT detailed ID includes voltage. `capacitors.yaml` omits voltage. Atlas seeds voltage.
- CS detailed ID has five fields. YAML adds `mount`. Atlas omits mount.
