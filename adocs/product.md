# Product

Atlas is Dino's Lab's visualizer of electronics types and packages. A visitor picks a family, sees bodies at true millimetre scale, sets field tokens, and copies the **ID**. That string is pasted into other Dino's Lab tools. Atlas does not search, stock, or store MPNs.

A type has three identities:

- **Key** — the class code
- **ID** — Key plus hyphen-separated fields; empty is `X`; every field keeps its position. This is what **Copy ID** puts on the clipboard.
- **Name** — the same sequence with spaces; inductor tolerance is `±` glued to the previous token. Shown, not copied.

The first screen is a homepage of component types. Opening a type goes to that family's page: identity strip, 3D lineup (click to inspect, Full view to restore), field pickers, type nav.

The taxonomy workshop (derived numbers, Edit taxonomy) is off the public page. Add `?edit=1` to turn it on. Hash stays `#/` or `#/<family>/<class>`; the query string is preserved.

DinoTree is the inventory of real parts: stock, locations, purchasing, BOMs. Atlas does not become that system.

Families in v1: Resistors, Capacitors, Inductors, Diodes, Transistors, ICs, Connectors.
