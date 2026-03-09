'use strict';

module.exports = {
  config: {
    name: "Physiology: Carapace",
    description: "A thick, shell-like dermal layer providing strong protection.",
    type: "trait",
    family: "physiology_carapace",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: +4,
    bludgeoningResistBonus: +2,
    agilityPenalty: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.bludgeoningResist === "number") r.bludgeoningResist = current.bludgeoningResist + state.bludgeoningResistBonus;
      if (typeof current.agilityPenalty === "number") r.agilityPenalty = current.agilityPenalty + state.agilityPenalty;
      return r;
    }
  }
};
