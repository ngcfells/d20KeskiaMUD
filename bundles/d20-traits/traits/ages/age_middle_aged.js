'use strict';

module.exports = {
  config: {
    name: "Age: Middle-Aged",
    description: "Middle-aged ability score adjustments.",
    type: "trait",
    family: "age_middle_aged",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -1,
      dexterity: -1,
      constitution: -1,
      intelligence: +1,
      wisdom: +1,
      charisma: +1
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
