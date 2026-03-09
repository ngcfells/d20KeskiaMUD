'use strict';

module.exports = {
  config: {
    name: "Size: Fine",
    description: "Fine-sized creature baseline modifiers.",
    type: "trait",
    family: "size_fine",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "fine",
    reach: 0,
    space: 1,
    height: 1,

    acMod: +4,
    attackMod: +4,
    hideMod: +8,
    grappleMod: -8,

    hpMult: 0.2,
    dmgMult: 0.3,
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
