'use strict';

module.exports = {
  config: {
    name: "Size: Minuscule",
    description: "Minuscule-scale creature baseline modifiers.",
    type: "trait",
    family: "size_minuscule",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "minuscule",
    reach: 0,
    space: 0.5,
    height: 0.5,

    acMod: +6,
    attackMod: +6,
    hideMod: +12,
    grappleMod: -12,

    hpMult: 0.1,
    dmgMult: 0.2,
    speedMult: 1.1
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
