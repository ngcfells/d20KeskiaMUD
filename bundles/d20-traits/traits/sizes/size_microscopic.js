'use strict';

module.exports = {
  config: {
    name: "Size: Microscopic",
    description: "Microscopic-scale creature baseline modifiers.",
    type: "trait",
    family: "size_microscopic",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "microscopic",
    reach: 0,
    space: 0,
    height: 0.1,

    acMod: +8,
    attackMod: +8,
    hideMod: +16,
    grappleMod: -16,

    hpMult: 0.05,
    dmgMult: 0.1,
    speedMult: 1.2
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
