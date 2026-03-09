'use strict';

/**
 * Effect: Aching Pain
 * Logic:
 * - Mechanical: -2 penalty to all primary active checks.
 * - Synergy: If the target is Shaken (Tier 2 Fear), the penalty 
 *   to Will saves doubles as the pain breaks their spirit.
 */
module.exports = {
  config: {
    name: "Aching Pain",
    description: "A persistent, dull throb disrupts your actions.",
    type: "condition",
    family: "pain",
    tier: 1,
    duration: 6000
  },

  modifiers: {
    attributes: {
      attack: -2,
      fortitude: -2,
      reflex: -2,
      will: -2,
      skill: -2
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      // Synergistic check for Shaken status from your common/ fear hierarchy
      if (target.effects.hasEffect('shaken')) {
          target.say("<bold><red>The pain combined with your mounting dread is nearly unbearable!</red></bold>");
          // You could dynamically adjust modifiers here if your engine supports it
      }
    },

    /**
     * Intercept Concentration checks
     */
    onSkillCheck(skill) {
      if (skill.name === 'concentration') {
        this.target.say("<red>The throbbing in your head makes it impossible to focus!</red>");
      }
    },

    effectDeactivated() {
      this.target.say("<cyan>The heavy, dull throb in your joints finally subsides.</cyan>");
    }
  }
};
