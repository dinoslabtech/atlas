# Capacitors

Source: `dinoslabtech/dinoslab-kicad-libs` `docs/Capacitors.md` and `components/passive/capacitors.yaml`.

| Key | Name | Fields |
|---|---|---|
| CC | Ceramic (MLCC) | capacitance, tolerance, package, voltage, dielectric |
| CE | Electrolytic | capacitance, tolerance, package, voltage, esr, ripple, temp, subtype |
| CT | Tantalum / polymer-tantalum | capacitance, tolerance, case, voltage, esr, subtype |
| CF | Film | capacitance, tolerance, package, voltage, film |
| CS | Supercapacitor / EDLC | capacitance, tolerance, package, voltage, esr |

CE and CT packages are can sizes and case letters. They are not drawn as EIA chips. CF and CS may use an EIA code (`1210`) or a THT token (`THT5mm`, `THT10x30`); the chip drawing is shown because `1210` is on the draw list.

## Specimens

| Key | ID | Name |
|---|---|---|
| CC | `CC-100nF-10%-0402-50V-X7R` | `CC 100nF 10% 0402 50V X7R` |
| CE | `CE-100uF-20%-0810-35V-100mR-500mA-105C-AL` | `CE 100uF 20% 0810 35V 100mR 500mA 105C AL` |
| CT | `CT-10uF-10%-B-16V-300mR-MNO2` | `CT 10uF 10% B 16V 300mR MNO2` |
| CF | `CF-100nF-5%-THT5mm-250V-PP` | `CF 100nF 5% THT5mm 250V PP` |
| CS | `CS-1F-20%-THT10x30-2V5-100mR` | `CS 1F 20% THT10x30 2V5 100mR` |

Subtype tokens for CE: `AL`, `ALP`, `ALH`. For CT: `MNO2`, `POLY`.

## Disagreements

- The CE `ID:` template line omits subtype. The field table, the worked example, and the YAML include it. Atlas seeds subtype so the example is representable.
- CT detailed ID includes voltage. `capacitors.yaml` omits voltage. Atlas seeds voltage.
- CS detailed ID has five fields. YAML adds `mount`. Atlas omits mount.
