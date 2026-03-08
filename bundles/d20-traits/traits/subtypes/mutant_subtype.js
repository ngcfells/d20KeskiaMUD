'use strict';

module.exports = {
  config: {
    name: "Mutant Subtype",
    description: "Resistance to mutation instability and genetic disruption.",
    type: "trait",
    family: "subtype_mutant",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "wasteland_mutation_instability") result.cancel = true;
      };
    }
  }
};
