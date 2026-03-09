'use strict';

module.exports = {
  config: {
    name: "Centipede Poison",
    description: "Burning venom courses through your veins.",
    duration: 45000,
    tickInterval: 15000
  },

  state: {},

  modifiers: {
    attributes: {
      dexterity: -2
    }
  },

  listeners: {
    effectTick() {
      const player = this.target;
      player.say("<red>The venom burns beneath your skin!</red>");
      player.mutateAttribute('health', -2);
    },

    effectDeactivated() {
      this.target.say("<white>The burning sensation fades.</white>");
    }
  }
};
