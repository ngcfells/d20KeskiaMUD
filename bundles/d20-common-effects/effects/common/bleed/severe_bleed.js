'use strict';

module.exports = {
  config: {
    name: "Severe Bleed",
    description: "A serious wound gushes blood. You take heavy damage over time and suffer severe physical penalties.",
    type: "condition",
    family: "bleed",
    tier: 3,
    maxTier: 3,
    duration: 40000
  },

  state: {
    tickInterval: 2000, // damage every 2 seconds
    tickDamage: 3
  },

  modifiers: {
    attributes: {
      strength: -3,
      dexterity: -2,
      reflex: -2,
      staminaRegen: -2,
      will: -1
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<red>Blood pours from a grievous wound!</red>");
      this.startBleedTick();
    },

    effectDeactivated() {
      this.target.say("<cyan>The bleeding finally stops.</cyan>");
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
