'use strict';

module.exports = {
  config: {
    name: "Physiology: Force Immune System",
    description: "A physiology harmonized with the Force, resisting corruption and afflictions.",
    type: "trait",
    family: "physiology_force_immune_system",
    unique: true,
    persists: true
  },

  state: {
    corruptionResistBonus: +4,
    diseaseResistBonus: +2,
    poisonResistBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.corruptionResist === "number") r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      if (typeof current.diseaseResist === "number") r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      if (typeof current.poisonResist === "number") r.poisonResist = current.poisonResist + state.poisonResistBonus;
      return r;
    }
  }
};
