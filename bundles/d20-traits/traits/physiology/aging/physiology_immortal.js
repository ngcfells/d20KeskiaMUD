'use strict';

module.exports = {
  config: {
    name: "Physiology: Immortal",
    description: "A physiology that does not age and cannot die of old age.",
    type: "trait",
    family: "physiology_immortal",
    unique: true,
    persists: true
  },

  state: {
    noAging: true,
    noNaturalDeath: true
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.noAging) r.noAging = true;
      if (state.noNaturalDeath) r.noNaturalDeath = true;
      return r;
    }
  }
};
