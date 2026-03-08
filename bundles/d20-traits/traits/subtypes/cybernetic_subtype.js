'use strict';

module.exports = {
  config: {
    name: "Cybernetic Subtype",
    description: "Resistance to EMP and system disruption.",
    type: "trait",
    family: "subtype_cybernetic",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "tech_emp") result.cancel = true;
      };
    }
  }
};
