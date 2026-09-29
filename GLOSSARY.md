# Atlas

Atlas is the workshop where a component type receives three identities.

## Language

**Key**:
The class code (`RR`, `CC`, `LL`, `DD`, `QN`, …). ASCII. Stable for a class.
_Avoid_: Type, CID, Reference, Value

**ID**:
The ordered field sequence, hyphen-separated, starting with the Key. Every field keeps its position. Missing means `X`.
_Avoid_: SKU, MPN, Value

**Name**:
The same sequence with spaces instead of dashes. Inductor tolerance is prefixed with `±` and glued to the previous token (`100nH±5%`).
_Avoid_: Value (the kicad-libs name for this string), Description

**Family**:
A group of classes (Resistors, Capacitors, Inductors, Diodes, Transistors, ICs, Connectors).

**Class**:
One Key plus an ordered list of fields.

**Field**:
One positional slot in the ID. It has a label, example tokens, and an optional kind (`chip-package` or `tolerance-plusminus`).
