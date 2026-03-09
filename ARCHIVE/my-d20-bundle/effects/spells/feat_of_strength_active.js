'use strict';

module.exports = {
  config: {
    name: "Feat of Strength",
    description: "Your physical power is unnaturally heightened for a brief burst of effort.",
    type: "buff",
    family: "alteration",
    tier: 1,
    duration: 6000
  },

  listeners: {
    effectActivated() {
      // Logic: Grant a temporary tag to allow 'Great Feats' like breaking doors
      this.target.addTag('titan_strength');
    },

    /**
     * Special Hook: On 'break' or 'force' attempts
     */
    onSkillCheck(skill) {
      if (skill.name === 'athletics' || skill.name === 'force_door') {
        this.target.say("<red>The iron-bound power within you surges as you exert yourself!</red>");
      }
    },

    effectDeactivated() {
      this.target.removeTag('titan_strength');
      this.target.say("<yellow>The titanic strength leaves your limbs, leaving you feeling strangely light.</yellow>");
    }
  }
};
