'use strict';

module.exports = {
  config: {
    name: "Age: Juvenile",
    description: "Juvenile developmental stage.",
    type: "trait",
    family: "age_juvenile",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -2,
      dexterity: -1,
      constitution: -1,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
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
