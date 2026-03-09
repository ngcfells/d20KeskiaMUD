'use strict';

module.exports = {
  config: {
    name: "Physiology: Undead Immune System",
    description: "A necrotic physiology immune to biological afflictions.",
    type: "trait",
    family: "physiology_undead_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseImmunity: true,
    poisonImmunity: true,
    toxinImmunity: true,
    necroticResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.diseaseImmunity) r.diseaseImmunity = true;
      if (state.poisonImmunity) r.poisonImmunity = true;
      if (state.toxinImmunity) r.toxinImmunity = true;
      if (typeof current.necroticResist === "number") r.necroticResist = current.necroticResist + state.necroticResistBonus;
      return r;
    }
  }
};
