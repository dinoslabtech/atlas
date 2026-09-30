---
status: accepted
---

# Field addition bar

A new **Field** is appended to a **Class** only when two types of that Class would otherwise copy the same **ID**, and the slot is an electrical or mechanical rating of the type. Shop ratings, MPN, stock, and derived numbers stay off the ID. New slots append; the existing prefix stays.

Catalog columns (every DigiKey filter), author whim per Class, and “wait until DinoTree asks” were rejected: the first vacuum-cleans shop data onto the ID, the second drifts, and no downstream tool parses Atlas IDs yet.

A Class may close a review with no new Field. Missing example tokens on Fields that already exist are token gaps, not new Fields.
