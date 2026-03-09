'use strict';

/**
 * Assay Spell Resistance Buff
 * ---------------------------
 * Intercepts caster level checks. If the victim matches the 
 * designated targetId, apply +10 to the check.
 */
module.exports = {
  config: {
    name: "Assayed Resistance",
    description: "You have identified the flaws in a specific target's spell resistance.",
    type: "condition",
    family: "divination",
    tier: 1,
    maxTier: 1
  },
  state: {
    targetId: null
  },
  modifiers: {
    attributes: {
      // This bonus is situational, handled via listeners/hooks
    }
  },
  listeners: {
    /**
     * Hook into the Spell Resistance check logic
     */
    onOvercomeSR: state => function (checkData) {
      // checkData contains { victim, casterLevelCheck }
      if (checkData.victim.id === this.state.targetId) {
        checkData.casterLevelCheck += 10;
        this.target.say(`<magenta>[Assay]: You bypass ${checkData.victim.name}'s resistance with clinical precision.</magenta>`);
      }
    },
    effectActivated() {
      this.target.setMeta('isAssaying', this.state.targetId);
    },
    effectDeactivated() {
      this.target.setMeta('isAssaying', null);
      this.target.say("<grey>The tactical highlights of your enemy's aura fade from your sight.</grey>");
    }
  }
};
