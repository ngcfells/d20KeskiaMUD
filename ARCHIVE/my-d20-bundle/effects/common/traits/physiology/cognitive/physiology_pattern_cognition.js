'use strict';

module.exports = {
  config: {
    name: "Physiology: Pattern Cognition",
    description: "A cognitive system structured around pattern recognition and magical matrices.",
    type: "trait",
    family: "physiology_pattern_cognition",
    unique: true,
    persists: true
  },

  state: {
    patternAwarenessBonus: +3,
    magicResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.patternAwareness === "number") r.patternAwareness = current.patternAwareness + state.patternAwarenessBonus;
      if (typeof current.magicResist === "number") r.magicResist = current.magicResist + state.magicResistBonus;
      return r;
    }
  }
};
