'use strict';

module.exports = {
  config: {
    name: "Physiology: Ooze Diffusion",
    description: "A physiology where nutrients and energy diffuse through amorphous mass.",
    type: "trait",
    family: "physiology_ooze_diffusion",
    unique: true,
    persists: true
  },

  state: {
    bleedImmunity: true,
    toxinResistBonus: +2,
    massReformBonus: +2
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (state.bleedImmunity) r.bleedImmunity = true;
      if (typeof current.toxinResist === "number") r.toxinResist = current.toxinResist + state.toxinResistBonus;
      if (typeof current.massReform === "number") r.massReform = current.massReform + state.massReformBonus;
      return r;
    }
  }
};
