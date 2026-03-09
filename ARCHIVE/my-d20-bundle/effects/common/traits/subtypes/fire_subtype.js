'use strict';

module.exports = {
  config: {
    name: "Fire Subtype",
    description: "Immunity to fire and vulnerability to cold.",
    type: "trait",
    family: "subtype_fire",
    unique: true,
    persists: true
  },

  state: {},

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();

        if (fam === "fire_damage") {
          result.cancel = true;
        }
      };
    },

    onIncomingDamage() {
      return data => {
        if (data.type === "cold") {
          data.amount = Math.floor(data.amount * 1.5);
        }
      };
    }
  }
};
