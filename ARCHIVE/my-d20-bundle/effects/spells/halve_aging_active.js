'use strict';

/**
 * Halve Aging Effect
 * ------------------
 * Intercepts aging increments and reduces magical aging duration.
 */
module.exports = {
  config: {
    name: "Halved Aging",
    description: "Your biological clock has been magically slowed to half-speed.",
    type: "condition",
    family: "necromancy",
    tier: 1,
    maxTier: 1,
    persistsAcrossDeath: true 
  },
  listeners: {
    effectActivated() {
      this.target.setMeta('aging_rate', 0.5);
      this.target.say("<white>You feel a strange, sluggish peace settle into your bones.</white>");
    },

    /**
     * Intercept Magical Aging (like 'Age Other' or 'Sands of Time')
     */
    onMagicalAging: state => function (agingData) {
      // agingData.years: the amount of years being added
      const yearsAdded = agingData.years;
      
      // Halve Aging reduces the impact: 2 years of attack = 1 year of duration loss
      // Note: In a permanent spell, this usually translates to a 50% reduction in the aging penalty
      agingData.years = Math.floor(yearsAdded / 2);
      
      this.target.say("<cyan>Your chronomantic shield absorbs half of the unnatural aging!</cyan>");
    },

    effectDeactivated() {
      this.target.setMeta('aging_rate', 1.0);
    }
  }
};
