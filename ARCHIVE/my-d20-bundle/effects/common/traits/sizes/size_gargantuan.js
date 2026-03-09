'use strict';

module.exports = {
  config: {
    name: "Size: Gargantuan",
    description: "Gargantuan-sized creature baseline modifiers.",
    type: "trait",
    family: "size_gargantuan",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "gargantuan",
    reach: 25,
    space: 20,
    height: 50,

    acMod: -4,
    attackMod: -4,
    hideMod: -8,
    grappleMod: +12,

    hpMult: 1.6,
    dmgMult: 1.6,
    speedMult: 0.9
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
