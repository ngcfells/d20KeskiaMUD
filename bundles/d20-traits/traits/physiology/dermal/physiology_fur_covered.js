'use strict';

module.exports = {
  config: {
    name: "Physiology: Fur-Covered",
    description: "A dermal layer covered in insulating fur.",
    type: "trait",
    family: "physiology_fur_covered",
    unique: true,
    persists: true
  },

  state: {
    naturalArmorBonus: +1,
    coldResistBonus: +2,
    heatVulnerabilityBonus: +1,
    stealthPenalty: +1
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.naturalArmor === "number") r.naturalArmor = current.naturalArmor + state.naturalArmorBonus;
      if (typeof current.coldResist === "number") r.coldResist = current.coldResist + state.coldResistBonus;
      if (typeof current.heatVulnerability === "number") r.heatVulnerability = current.heatVulnerability + state.heatVulnerabilityBonus;
      if (typeof current.stealthPenalty === "number") r.stealthPenalty = current.stealthPenalty + state.stealthPenalty;
      return r;
    }
  }
};
