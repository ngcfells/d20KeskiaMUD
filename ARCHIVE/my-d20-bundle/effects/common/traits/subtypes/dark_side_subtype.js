'use strict';

module.exports = {
  config: {
    name: "Dark-Side Subtype",
    description: "Aligned with the Dark Side of the Force.",
    type: "trait",
    family: "subtype_dark_side",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();

        // Resist Light Side effects
        if (fam === "force_light_side") {
          result.resist = true;
        }

        // Vulnerable to Dark Side backlash (rare)
        if (fam === "force_dark_backlash") {
          result.vulnerable = true;
        }
      };
    }
  }
};
