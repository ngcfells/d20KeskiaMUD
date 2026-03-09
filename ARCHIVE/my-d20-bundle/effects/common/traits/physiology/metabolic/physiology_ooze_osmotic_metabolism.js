'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Osmotic Metabolism",
    description: "A metabolism based on osmotic absorption of nutrients.",
    type: "trait",
    family: "physiology_ooze_osmotic_metabolism",
    unique: true,
    persists: true
  },

  state: {
    staminaBonus: +3,
    fatigueRate: -1,
    absorptionBonus: +4
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.absorption === "number") r.absorption = current.absorption + state.absorptionBonus;
      if (typeof current.fatigueRate === "number") r.fatigueRate = current.fatigueRate + state.fatigueRate;
      return r;
    }
  }
};
