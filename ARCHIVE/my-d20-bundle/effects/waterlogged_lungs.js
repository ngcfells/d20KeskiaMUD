'use strict';

module.exports = {
  config: {
    name: "Waterlogged Lungs",
    description: "Your lungs burn with stagnant water, making breathing difficult.",
    duration: 60000, // 1 minute
    tickInterval: 15000
  },

  state: {},

  modifiers: {
    attributes: {
      stamina: -2
    }
  },

  listeners: {
    effectTick() {
      const player = this.target;
      player.say("<blue>You cough violently as foul water fills your lungs.</blue>");
      player.mutateAttribute('health', -1);
    },

    effectDeactivated() {
      this.target.say("<white>You finally expel the last of the foul water.</white>");
    }
  }
};
