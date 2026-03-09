'use strict';

module.exports = {
  config: {
    name: "Light-Side Subtype",
    description: "Aligned with the Light Side of the Force.",
    type: "trait",
    family: "subtype_light_side",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();

        // Resist Dark Side effects
        if (fam === "force_dark_side") {
          result.resist = true;
        }

        // Vulnerable to Light-Side backlash (rare)
        if (fam === "force_light_backlash") {
          result.vulnerable = true;
        }
      };
    }
  }
};
