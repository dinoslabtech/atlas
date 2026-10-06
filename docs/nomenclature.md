# Nomenclature

A component type has three identities.

**Key** is the class code: `RR`, `RX`, `CC`, `LL`, `DD`, `QN`, …

**ID** is the Key, then each field in order, separated by `-`. Every field keeps its position. A missing or empty field is `X`. Atlas copies this string (Copy ID).

**Name** is the same sequence with spaces instead of dashes. For inductor classes, a tolerance field is prefixed with `±` and glued to the previous token: `LL 100nH±5% 0402 500MHz SH`.

Codes are ASCII. Resistance uses `R` as the decimal separator (`4R7`, `10k`, `0R`). Do not use `Ω`. Capacitance uses SI prefixes without a leading decimal (`100nF`, `4u7`). Current is `150mA`, `1A`. Power is `500mW`, `1W`.

kicad-libs called the Name string **Value**. Atlas uses Name.

## Families

| Family | Keys | Status |
|---|---|---|
| Resistors | RR, RX, RW, RS, RN | specified |
| Capacitors | CC, CE, CT, CF, CS | specified |
| Inductors | LL, LP, LR, LC, FB | specified |
| Diodes | DD, DS, DZ, DL | specified |
| Transistors | QN, QP, MN, MP | specified |
| ICs | IC | specified |
| Connectors | JJ | specified |
