'use strict';

/**
 * Unified Effect: Accelerated State
 * Handles: Speed bonuses, Dodge AC, and Skill-penalty negation.
 */
module.exports = {
  config: {
    name: 'Accelerated',
    description: 'Your movements are enhanced by transmutation magic.',
    type: 'spell.transmutation',
    unique: true,
    persists: false,
  },
  state: {
    speedBonus: 0,
    dodgeBonus: 0,
    negatedSkills: []
  },
  modifiers: {
    attributes: {
      // Speed enhancement (Accelerate)
      speed: function (current) {
        return current + (this.state.speedBonus || 0);
      },
      // Dodge bonuses (Accelerate)
      armorKinetic: function (current) {
        return current + (this.state.dodgeBonus || 0);
      },
      armorBallistic: function (current) {
        return current + (this.state.dodgeBonus || 0);
      },
      armorEnergy: function (current) {
        return current + (this.state.dodgeBonus || 0);
      }
    }
  },
  listeners: {
    effectActivated: function () {
      this.target.addTag('is_accelerated');
    },
    effectDeactivated: function () {
      this.target.removeTag('is_accelerated');
    },
    /**
     * Skill Interceptor: Negates movement penalties (Accelerated Movement)
     */
    onCalculateSkillPenalty: function (state) {
      return (skill, penaltyData) => {
        if (this.state.negatedSkills.includes(skill.id)) {
          penaltyData.movementPenalty = 0;
        }
      };
    }
  }
};
