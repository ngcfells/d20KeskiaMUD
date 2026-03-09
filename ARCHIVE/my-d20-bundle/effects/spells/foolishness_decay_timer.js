'use strict';

module.exports = {
  config: {
    name: "Foolishness Decay",
    type: "condition",
    hidden: true,
    persistsAcrossDeath: true
  },
  listeners: {
    effectDeactivated() {
      // If 24 hours pass and the effect isn't removed via restoration
      const target = this.target;
      target.setMeta('isWisdomDamageIncurable', true);
      target.say("<red>A final, cold snap echoes in your mind. The loss of your faculties has become permanent.</red>");
    }
  }
};
