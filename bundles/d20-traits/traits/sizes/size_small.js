'use strict';

module.exports = {
  config: {
    name: "Size: Small",
    description: "Small-sized creature baseline modifiers.",
    type: "trait",
    family: "size_small",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "small",
    reach: 5,
    space: 5,
    height: 5,

    acMod: +1,
    attackMod: +1,
    hideMod: +1,
    grappleMod: -1,

    hpMult: 0.9,
    dmgMult: 0.9,
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
