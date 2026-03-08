'use strict';

module.exports = {
  config: {
    name: "Age: Venerable",
    description: "Venerable age ability score adjustments.",
    type: "trait",
    family: "age_venerable",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: -3,
      dexterity: -3,
      constitution: -3,
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
