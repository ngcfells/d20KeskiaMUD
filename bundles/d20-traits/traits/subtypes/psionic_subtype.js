'use strict';

module.exports = {
  config: {
    name: "Psionic Subtype",
    description: "Resistance to mind-affecting and psionic disruption.",
    type: "trait",
    family: "subtype_psionic",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "psionic_disruption") result.cancel = true;
      };
    }
  }
};
