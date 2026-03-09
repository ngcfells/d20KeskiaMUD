'use strict';

module.exports = {
  config: {
    name: "Dragon Traits",
    description: "Standard dragon resistances and mechanical features.",
    type: "trait",
    family: "creature_trait_dragon",
    unique: true,
    persists: true
  },

  state: {},

  modifiers: {
    attributes(current) {
      return {
        will: current.will + 2,
        reflex: current.reflex + 1,
        fortitude: current.fortitude + 2
      };
    }
  }
};
