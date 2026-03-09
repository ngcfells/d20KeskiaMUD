# D20 Bundle Metadata Contract

This document defines the **canonical metadata format** for all JS-based content types in this bundle:

- Feats
- Spells (See spell-definition.md)
- Abilities
- Stances
- NPCs
- Items
- (and any future JS-based content types)

The **validator–refactor engine** assumes and enforces this contract.

---

## 1. Shared metadata fields

All JS content types share these core fields:

- **`id`**  
  - **Type:** string  
  - **Required:** yes  
  - **Format:** `snake_case`, unique within its content type  
  - **Example:** `power_attack`, `fireball`, `rage`, `defensive_stance`

- **`name`**  
  - **Type:** string  
  - **Required:** yes  
  - **Format:** Human-readable, title case  
  - **Example:** `Power Attack`, `Fireball`

- **`category`**  
  - **Type:** string  
  - **Required:** yes  
  - **Purpose:** Drives directory placement and classification  
  - **Examples (feats):** `combat`, `magic`, `racial`, `bloodline`, `movement`, `psionic`, `general`, `other`  
  - **Examples (spells):** `magic`, `psionic`, `tech`, etc.  
  - **Examples (abilities/stances):** `combat`, `class`, `racial`, etc.

- **`type`**  
  - **Type:** string  
  - **Required:** yes  
  - **Purpose:** Identifies the content type  
  - **Examples:** `feat`, `spell`, `ability`, `stance`

- **`tags`**  
  - **Type:** array of strings  
  - **Required:** no (but recommended)  
  - **Purpose:** Search, filtering, UI hints  
  - **Examples:** `['attack', 'melee']`, `['fire', 'aoe']`

- **`description`**  
  - **Type:** string  
  - **Required:** no (but strongly recommended)  
  - **Purpose:** Player-facing description

- **Additional fields**  
  - Each content type may define its own extra fields (e.g. `school`, `level`, `class`, `prerequisites`, etc.).  
  - These are validated by type-specific rules.

---

## 2. Feats

### 2.1 File location (Model 2 layout)

Feats live under:

```text
data/feats/<category>/<letter>/<id>.js
```
# Feats
```javascript
'use strict';

module.exports = {
  id: 'power_attack',
  name: 'Power Attack',
  category: 'combat',        // REQUIRED
  type: 'feat',              // REQUIRED

  tags: ['attack', 'melee'],
  prerequisites: [],
  description: 'You can choose to take a –1 penalty on all melee attack rolls and combat maneuver checks to gain a +2 bonus on all melee damage rolls.',

  // Additional feat-specific fields may go here
};
```

# Ability

'use strict';

module.exports = {
  id: 'rage',
  name: 'Rage',
  category: 'class',
  type: 'ability',
  class: 'barbarian',
  level: 1,
  tags: ['combat'],
  description: '...',
};

# Stance

'use strict';

module.exports = {
  id: 'defensive_stance',
  name: 'Defensive Stance',
  category: 'combat',
  type: 'stance',
  tags: ['defense'],
  description: '...',
};


# items that are components must inclulde
  metadata: {
    materialId: 'pearl',
    value: 100
  }


# book template

## NPCs

# All extraplanar NPCs (Demons, Devils, Celestials) must now include the following metadata block for the banishment spell to function correctly:
```yml
"metadata": {
  "isExtraplanar": true,
  "homePlane": "Abyss",
  "dislikedItem": "vial_of_holy_water" 
}
```
