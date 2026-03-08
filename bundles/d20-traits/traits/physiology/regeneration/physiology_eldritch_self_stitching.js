'use strict';

module.exports = {
  config: {
    name: "Physiology: Eldritch Self-Stitching",
    description: "Non-Euclidean tissues reweave themselves.",
    type: "trait",
    family: "physiology_eldritch_self_stitching",
    unique: true,
    persists: true
  },

  state: {
    entropyRegenBonus: +5,
    regenBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.entropyRegen === "number") r.entropyRegen = current.entropyRegen + state.entropyRegenBonus;
      if (typeof current.regen === "number") r.regen = current.regen + state.regenBonus;
      return r;
    }
  }
};
