'use strict';

module.exports = {
  config: {
    name: "Force-Immune Subtype",
    description: "Unaffected by Force powers and Force-based effects.",
    type: "trait",
    family: "subtype_force_immune",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();

        // Cancel all Force-based effects
        if (fam.startsWith("force_")) {
          result.cancel = true;
        }
      };
    }
  }
};
