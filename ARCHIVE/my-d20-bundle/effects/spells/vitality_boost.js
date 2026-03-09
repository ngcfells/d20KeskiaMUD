'use strict';

module.exports = {
  config: {
    name: "Vitality Boost",
    type: "buff",
    hidden: false
  },
  modifiers: {
    attributes: {
      strength: (current) => current + 4,
      dexterity: (current) => current + 4,
      constitution: (current) => current + 4
    }
  },
  listeners: {
    effectActivated() {
      this.target.say("<yellow>You feel a surge of golden energy bolstering your strength and health!</yellow>");
    }
  }
};
