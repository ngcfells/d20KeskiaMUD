'use strict';

module.exports = {
  config: {
    name: "Force-Sensitive Subtype",
    description: "Indicates innate sensitivity to the Force.",
    type: "trait",
    family: "subtype_force_sensitive",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    // Force-based detection effects can target this creature
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "force_nullification") {
          // Force-null zones suppress Force abilities but do not remove this subtype
        }
      };
    }
  }
};
