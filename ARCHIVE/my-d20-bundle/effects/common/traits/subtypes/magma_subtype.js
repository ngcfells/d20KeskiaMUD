'use strict';

module.exports = {
  config: {
    name: "Magma Subtype",
    description: "Immunity to fire, resistance to acid, vulnerability to cold.",
    type: "trait",
    family: "subtype_magma",
    unique: true,
    persists: true
  },

  listeners: {
    onEffectAdd() {
      return (effect, result) => {
        const fam = (effect.config.family || "").toLowerCase();
        if (fam === "fire_damage") result.cancel = true;
      };
    },

    onIncomingDamage() {
      return data => {
        if (data.type === "acid") data.amount = Math.floor(data.amount / 2);
        if (data.type === "cold") data.amount = Math.floor(data.amount * 1.5);
      };
    }
  }
};
