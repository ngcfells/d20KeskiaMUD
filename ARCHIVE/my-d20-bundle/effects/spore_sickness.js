'use strict';

module.exports = {
  config: {
    name: "Spore Sickness",
    description: "Inhaled spores irritate your lungs and cloud your mind.",
    duration: 60000,
    tickInterval: 20000
  },

  state: {},

  listeners: {
    effectTick() {
      const player = this.target;
      player.say("<magenta>You cough violently as spores sting your lungs.</magenta>");
      player.mutateAttribute('health', -1);
      player.mutateAttribute('sanity', -1);
    },

    effectDeactivated() {
      this.target.say("<white>Your breathing steadies as the spores lose their grip.</white>");
    }
  }
};
