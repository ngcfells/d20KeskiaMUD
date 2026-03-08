'use strict';

module.exports = {
  config: {
    name: "Age: Young Adult",
    description: "Young adult developmental stage.",
    type: "trait",
    family: "age_young_adult",
    unique: true,
    persists: true
  },

  state: {
    adjustments: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
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
