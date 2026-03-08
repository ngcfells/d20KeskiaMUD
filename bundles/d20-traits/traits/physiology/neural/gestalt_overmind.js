'use strict';

module.exports = {
  config: {
    name: "Physiology: Gestalt Overmind",
    description: "A unified consciousness composed of many bodies, capable of dynamic focus.",
    type: "trait",
    family: "physiology_gestalt_overmind",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.2,
    initiativeBonus: +3,
    multiActionBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.multiAction === "number") r.multiAction = current.multiAction + state.multiActionBonus;

      return r;
    }
  }
};
