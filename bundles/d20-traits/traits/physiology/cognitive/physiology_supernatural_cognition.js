'use strict';

module.exports = {
  config: {
    name: "Physiology: Supernatural Cognition",
    description: "A cognitive system attuned to supernatural patterns and energies.",
    type: "trait",
    family: "physiology_supernatural_cognition",
    unique: true,
    persists: true
  },

  state: {
    magicAwarenessBonus: +3,
    charmResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.magicAwareness === "number") r.magicAwareness = current.magicAwareness + state.magicAwarenessBonus;
      if (typeof current.charmResist === "number") r.charmResist = current.charmResist + state.charmResistBonus;
      return r;
    }
  }
};
