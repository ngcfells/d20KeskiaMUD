'use strict';

module.exports = {
  config: {
    name: "Physiology: Chemosynthetic Digestion",
    description: "A physiology that derives nutrients from chemical reactions rather than organic food.",
    type: "trait",
    family: "physiology_chemosynthetic_digestion",
    unique: true,
    persists: true
  },

  state: {
    mineralDigestBonus: +4,
    toxinResistBonus: +3,
    organicFoodPenalty: -3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.mineralDigest === "number") r.mineralDigest = current.mineralDigest + state.mineralDigestBonus;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.organicFoodDigest === "number") r.organicFoodDigest = current.organicFoodDigest + state.organicFoodPenalty;
      return r;
    }
  }
};
