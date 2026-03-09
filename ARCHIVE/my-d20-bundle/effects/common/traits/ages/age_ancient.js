'use strict';

module.exports = {
  config: {
    name: "Age: Ancient",
    description: "Ancient age ability score adjustments.",
    type: "trait",
    family: "age_ancient",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -4,
      dexterity: -4,
      constitution: -4,
      intelligence: +2,
      wisdom: +2,
      charisma: +2
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
