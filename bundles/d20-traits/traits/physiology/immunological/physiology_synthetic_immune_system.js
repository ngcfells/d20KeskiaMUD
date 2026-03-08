'use strict';

module.exports = {
  config: {
    name: "Physiology: Synthetic Immune System",
    description: "A non-biological immune system based on diagnostics and self-repair.",
    type: "trait",
    family: "physiology_synthetic_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseImmunity: true,
    poisonResistBonus: +3,
    toxinResistBonus: +3,
    naniteResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.diseaseImmunity) r.diseaseImmunity = true;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.naniteResist === "number") r.naniteResist = current.naniteResist + state.naniteResistBonus;
      return r;
    }
  }
};
