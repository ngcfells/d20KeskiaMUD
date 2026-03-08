'use strict';

module.exports = {
  config: {
    name: "Age: Child",
    description: "Child developmental stage.",
    type: "trait",
    family: "age_child",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -3,
      dexterity: -2,
      constitution: -2,
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
