'use strict';

module.exports = {
  config: {
    name: "Physiology: Resilient Immune System",
    description: "A robust immune system highly resistant to toxins, disease, and environmental pathogens.",
    type: "trait",
    family: "physiology_resilient_immune_system",
    unique: true,
    persists: true
  },

  state: {
    diseaseResistBonus: +4,
    poisonResistBonus: +3,
    toxinResistBonus: +2,
    corruptionResistBonus: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.diseaseResist === "number") {
        r.diseaseResist = current.diseaseResist + state.diseaseResistBonus;
      }

      if (typeof current.poisonResist === "number") {
        r.poisonResist = current.poisonResist + state.poisonResistBonus;
      }

      if (typeof current.toxinResist === "number") {
        r.toxinResist = current.toxinResist + state.toxinResistBonus;
      }

      if (typeof current.corruptionResist === "number") {
        r.corruptionResist = current.corruptionResist + state.corruptionResistBonus;
      }

      return r;
    }
  }
};
