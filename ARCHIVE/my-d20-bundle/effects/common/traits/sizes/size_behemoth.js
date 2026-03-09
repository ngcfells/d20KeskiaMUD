'use strict';

module.exports = {
  config: {
    name: "Size: Behemoth",
    description: "Behemoth-sized creature baseline modifiers.",
    type: "trait",
    family: "size_behemoth",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "behemoth",

    // Cinematic geometry envelope (planetary-scale)
    reach: 150,
    space: 100,
    height: 600,

    // d20 lineage, slightly modified upward
    acMod: -16,
    attackMod: -16,
    hideMod: -20,
    grappleMod: +30,

    hpMult: 2.5,
    dmgMult: 2.5,
    speedMult: 0.5
  },

  modifiers: {
    attributes(current, state) {
      const r = {};

      if (typeof current.armor === "number") r.armor = current.armor + state.acMod;
      if (typeof current.hitRoll === "number") r.hitRoll = current.hitRoll + state.attackMod;
      if (typeof current.hide === "number") r.hide = current.hide + state.hideMod;
      if (typeof current.grapple === "number") r.grapple = current.grapple + state.grappleMod;

      if (typeof current.maxHealth === "number") r.maxHealth = Math.floor(current.maxHealth * state.hpMult);
      if (typeof current.damage === "number") r.damage = Math.floor(current.damage * state.dmgMult);
      if (typeof current.speed === "number") r.speed = Math.floor(current.speed * state.speedMult);

      return r;
    }
  }
};
