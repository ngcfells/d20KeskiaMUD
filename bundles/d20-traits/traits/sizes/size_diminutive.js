'use strict';

module.exports = {
  config: {
    name: "Size: Diminutive",
    description: "Diminutive-sized creature baseline modifiers.",
    type: "trait",
    family: "size_diminutive",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "diminutive",
    reach: 0,
    space: 2,
    height: 2,

    acMod: +2,
    attackMod: +2,
    hideMod: +4,
    grappleMod: -4,

    hpMult: 0.3,
    dmgMult: 0.5,
    speedMult: 1.05
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
