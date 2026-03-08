'use strict';

module.exports = {
  config: {
    name: "Age: Infant",
    description: "Infant developmental stage.",
    type: "trait",
    family: "age_infant",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -6,
      dexterity: -4,
      constitution: -4,
      intelligence: -2,
      wisdom: -2,
      charisma: -2
    }
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      for (const [attr, mod] of Object.entries(state.adjustments)) {
        if (typeof current[attr] === "number") r[attr] = current[attr] + mod;
      }
      return r;
    }
  }
};
