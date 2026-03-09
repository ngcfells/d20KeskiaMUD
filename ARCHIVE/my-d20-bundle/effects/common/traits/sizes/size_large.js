'use strict';

module.exports = {
  config: {
    name: "Size: Large",
    description: "Large-sized creature baseline modifiers.",
    type: "trait",
    family: "size_large",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "large",
    reach: 10,
    space: 10,
    height: 12,

    acMod: -1,
    attackMod: -1,
    hideMod: -2,
    grappleMod: +4,

    hpMult: 1.2,
    dmgMult: 1.2,
    speedMult: 1.0
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
