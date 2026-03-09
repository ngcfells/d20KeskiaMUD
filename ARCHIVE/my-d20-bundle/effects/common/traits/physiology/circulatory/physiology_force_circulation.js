'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Circulation",
    description: "A circulatory system harmonized with the Force.",
    type: "trait",
    family: "physiology_force_circulation",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    forceRegenBonus: +3,
    corruptionResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.forceRegen === "number") r.forceRegen = current.forceRegen + state.forceRegenBonus;
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      return r;
    }
  }
};
