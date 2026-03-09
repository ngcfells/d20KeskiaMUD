'use strict';

module.exports = {
  config: {
    name: "Physiology: Infernal Contractual Mind",
    description: "A neural architecture bound by metaphysical law structures.",
    type: "trait",
    family: "physiology_infernal_contractual_mind",
    unique: true,
    persists: true
  },

  state: {
    speedMult: 1.05,
    initiativeBonus: +1,
    logicLawBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);
      if (typeof current.initiative === "number") r.initiative = current.initiative + state.initiativeBonus;
      if (typeof current.logicLaw === "number") r.logicLaw = current.logicLaw + state.logicLawBonus;
      return r;
    }
  }
};
