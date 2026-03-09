'use strict';

module.exports = {
  config: {
    name: "Giant Traits",
    description: "Standard giant physical bonuses.",
    type: "trait",
    family: "creature_trait_giant",
    unique: true,
    persists: true
  },

  state: {},

  modifiers: {
    attributes(current) {
      return {
        fortitude: current.fortitude + 2,
        strength: current.strength + 2
      };
    }
  }
};
