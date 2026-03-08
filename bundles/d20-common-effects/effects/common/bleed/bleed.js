'use strict';

module.exports = {
  config: {
    name: "Bleed",
    description: "A wound bleeds steadily. You take moderate damage over time and suffer noticeable physical penalties.",
    type: "condition",
    family: "bleed",
    tier: 2,
    maxTier: 3,
    duration: 30000
  },

  state: {
    tickInterval: 3000, // damage every 3 seconds
    tickDamage: 2
  },

  modifiers: {
    attributes: {
      strength: -1,
      dexterity: -1,
      reflex: -1,
      staminaRegen: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<magenta>Blood flows freely from a deeper wound.</magenta>");
      this.startBleedTick();
    },

    effectDeactivated() {
      this.target.say("<cyan>The bleeding slows and clots.</cyan>");
      this.stopBleedTick();
    }
  },

  methods: {
    startBleedTick() {
      const player = this.target;
      const { tickInterval, tickDamage } = this.state;

      this.state._interval = setInterval(() => {
        player.damage(tickDamage, "bleed");
      }, tickInterval);
    },

    stopBleedTick() {
      if (this.state._interval) clearInterval(this.state._interval);
    }
  }
};
