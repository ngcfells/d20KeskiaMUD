'use strict';

module.exports = {
  config: {
    name: "Age: Old",
    description: "Old age ability score adjustments.",
    type: "trait",
    family: "age_old",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -2,
      dexterity: -2,
      constitution: -2,
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
