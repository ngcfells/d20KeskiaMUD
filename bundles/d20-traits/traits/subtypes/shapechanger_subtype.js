'use strict';

module.exports = {
  config: {
    name: "Shapechanger Subtype",
    description: "Resistance to polymorph effects.",
    type: "trait",
    family: "subtype_shapechanger",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        if ((effect.config.family || "").toLowerCase() === "polymorph") {
          result.cancel = true;
        }
      };
    }
  }
};
