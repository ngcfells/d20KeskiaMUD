'use strict';

module.exports = {
  config: {
    name: "Swarm Subtype",
    description: "Immunity to single-target weapon damage and vulnerability to area effects.",
    type: "trait",
    family: "subtype_swarm",
    unique: true,
    persists: true
  },

  listeners: {
    onIncomingWeaponDamage() {
      return data => {
        if (!data.isArea) data.amount = 0;
      };
    },

    onIncomingAreaDamage() {
      return data => {
        data.amount = Math.floor(data.amount * 1.5);
      };
    }
  }
};
