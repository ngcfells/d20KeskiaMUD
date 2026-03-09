'use strict';

module.exports = {
  config: {
    name: "Chronal Collapse",
    description: "Your biological systems are failing due to temporal trauma.",
    type: "death_timer",
    family: "time",
    duration: 12000
  },

  listeners: {
    effectDeactivated() {
      const target = this.target;
      if (target.getAttribute('health') > 0) {
        target.say("<bold><red>Your body simply cannot withstand the accelerated passage of time. You collapse.</red></bold>");
        // Invoke death logic
        target.lowerAttribute('health', target.getMaxAttribute('health'));
      }
    }
  }
};
