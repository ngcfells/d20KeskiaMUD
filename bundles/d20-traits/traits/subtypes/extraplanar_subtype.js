'use strict';

module.exports = {
  config: {
    name: "Extraplanar Subtype",
    description: "Subject to banishment and planar effects.",
    type: "trait",
    family: "subtype_extraplanar",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "banishment") {
          // Banishment effects apply normally; no immunity.
        }
      };
    }
  }
};
