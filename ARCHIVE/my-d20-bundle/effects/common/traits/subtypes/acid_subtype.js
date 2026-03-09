'use strict';

module.exports = {
  config: {
    name: "Acid Subtype",
    description: "Immunity to acid damage.",
    type: "trait",
    family: "subtype_acid",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "acid_damage") {
          result.cancel = true;
        }
      };
    }
  }
};
