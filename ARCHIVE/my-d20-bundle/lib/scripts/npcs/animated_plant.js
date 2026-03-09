'use strict';

module.exports = {
  listeners: {
    /**
     * Combat Flavor
     */
    hit: state => function (damage, target) {
      state.Broadcast.sayAt(this.room, `The ${this.name} delivers a crushing blow with a heavy, bark-covered limb!`);
    },

    /**
     * Massive Entity Movement Emotes
     */
    updateTick: state => function () {
      if (Math.random() > 0.9) {
        state.Broadcast.sayAt(this.room, "The ground trembles slightly as the massive plant shifts its weight, roots churning the soil.");
      }
    },

    /**
     * Death Logic
     */
    death: state => function () {
      state.Broadcast.sayAt(this.room, `The animate energy leaves the ${this.name}; it collapses into a heap of splintered wood and tangled vines.`);
    }
  }
};
