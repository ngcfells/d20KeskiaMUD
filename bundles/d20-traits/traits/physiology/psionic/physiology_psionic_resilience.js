'use strict';

module.exports = {
  config: {
    name: "Physiology: Psionic Resilience",
    description: "A mind hardened by psionic mutation, granting resistance to illusions, enchantments, and telepathic intrusion.",
    type: "trait",
    family: "physiology_psionic_resilience",
    unique: true,
    persists: true
  },

  state: {
    illusionResist: 2,
    enchantResist: 2,
    telepathyResist: 2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.illusionResist === "number")
        r.illusionResist = current.illusionResist + state.illusionResist;

      if (typeof current.enchantResist === "number")
        r.enchantResist = current.enchantResist + state.enchantResist;

      if (typeof current.telepathyResist === "number")
        r.telepathyResist = current.telepathyResist + state.telepathyResist;

      return r;
    }
  }
};
