'use strict';

module.exports = {
  config: {
    name: "Size: Huge",
    description: "Huge-sized creature baseline modifiers.",
    type: "trait",
    family: "size_huge",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "huge",
    reach: 15,
    space: 15,
    height: 25,

    acMod: -2,
    attackMod: -2,
    hideMod: -4,
    grappleMod: +8,

    hpMult: 1.4,
    dmgMult: 1.4,
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
