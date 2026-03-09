'use strict';

module.exports = {
  config: {
    name: "Monstrous Humanoid Traits",
    description: "Standard monstrous humanoid bonuses.",
    type: "trait",
    family: "creature_trait_monstrous_humanoid",
    unique: true,
    persists: true
  },

  state: {},

  modifiers: {
    attributes(current) {
      return {
        reflex: current.reflex + 1,
        will: current.will + 1
      };
    }
  }
};
