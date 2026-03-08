'use strict';

module.exports = {
  config: {
    name: "Size: Titanic",
    description: "Titanic-sized creature baseline modifiers.",
    type: "trait",
    family: "size_titanic",
    unique: true,
    persists: true
  },

  state: {
    sizeCategory: "titanic",

    // Cinematic geometry envelope
    reach: 60,
    space: 50,
    height: 250,

    // d20 lineage, slightly modified
    acMod: -12,
    attackMod: -12,
    hideMod: -16,
    grappleMod: +20,

    hpMult: 2.0,
    dmgMult: 2.0,
    speedMult: 0.7
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
