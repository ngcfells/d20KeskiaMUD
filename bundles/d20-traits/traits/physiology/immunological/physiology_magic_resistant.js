'use strict';

module.exports = {
  config: {
    name: "Physiology: Magic Resistant",
    description: "A physiology resistant to magical influence and arcane effects.",
    type: "trait",
    family: "physiology_magic_resistant",
    unique: true,
    persists: true
  },

  state: {
    magicResistBonus: +3
  },

  modifiers: {
    attributes(current, state) {
      const r = {};
      if (typeof current.magicResist === "number") r.magicResist = current.magicResist + state.magicResistBonus;
      return r;
    }
  }
};
