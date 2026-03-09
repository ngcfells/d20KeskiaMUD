'use strict';

module.exports = {
  config: {
    name: "Minor Bleed",
    description: "A shallow wound seeps blood. You take light damage over time and suffer minor physical penalties.",
    type: "condition",
    family: "bleed",
    tier: 1,
    maxTier: 3,
    duration: 20000
  },

  state: {
    tickInterval: 4000, // damage every 4 seconds
    tickDamage: 1
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Blood trickles from a shallow wound.</yellow>");
      this.startBleedTick();
    },

    effectDeactivated() {
      this.target.say("<cyan>The bleeding slows and stops.</cyan>");
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
