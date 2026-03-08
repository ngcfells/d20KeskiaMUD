'use strict';

module.exports = {
  config: {
    name: "Neutral-Force Subtype",
    description: "Aligned with neither the Light nor Dark Side.",
    type: "trait",
    family: "subtype_force_neutral",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();

        // Neutral creatures resist alignment-based Force effects
        if (fam === "force_light_side" || fam === "force_dark_side") {
          result.resist = true;
        }
      };
    }
  }
};
