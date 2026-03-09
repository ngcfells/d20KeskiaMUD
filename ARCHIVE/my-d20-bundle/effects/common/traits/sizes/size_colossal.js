'use strict';

module.exports = {
  config: {
    name: "Size: Colossal",
    description: "Colossal-sized creature baseline modifiers.",
    type: "trait",
    family: "size_colossal",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "colossal",
    reach: 40,
    space: 30,
    height: 100,

    acMod: -8,
    attackMod: -8,
    hideMod: -12,
    grappleMod: +16,

    hpMult: 1.8,
    dmgMult: 1.8,
    speedMult: 0.8
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
