'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Adept Spirit",
    description: "The spirit of an ancient sage guides your mind and magic.",
    type: "buff",
    family: "insight",
    tier: 1,
    duration: 60000
  },

  modifiers: {
    attributes: {
      will: 2,
      intelligence: 1
    }
  },

  listeners: {
    effectActivated() {
      // Logic for CL bonus usually lives in the Spellcasting engine, 
      // but we tag the player for the engine to check.
      this.target.addTag('adept_spirit_active');
    },

    /**
     * Visual feedback hook for the potency bonus
     */
    onBeforeSpellCast: function (state) {
      return (subject, castCtx) => {
        B.sayAt(subject, "<cyan>The spectral sage within you guides your incantation, lending it extra potency.</cyan>");
      };
    },

    updateTick() {
      if (Math.random() > 0.9) {
        this.target.say("<white>A calm, scholarly presence whispers ancient secrets to your mind.</white>");
      }
    },

    effectDeactivated() {
      this.target.removeTag('adept_spirit_active');
      this.target.say("<grey>The spectral sage fades away, taking its ancient wisdom with it.</grey>");
      B.sayAtExcept(this.target.room, `<grey>The ghostly master sage overlapping ${this.target.name} vanishes.</grey>`, [this.target]);
    }
  }
};
