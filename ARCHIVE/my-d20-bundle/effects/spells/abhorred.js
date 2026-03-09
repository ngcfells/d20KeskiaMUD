// path: bundles/my-d20-bundle/effects/spells/abhorred.js
'use strict';

module.exports = {
  config: {
    name: "Abhorred",
    description: "You project an aura of disgust. Your next social attempt is likely to fail.",
    type: "condition",
    family: "humiliation",
    tier: 1,
    duration: 60000 
  },

  modifiers: {
    attributes: {
      charisma: -4,
      appearance: -6
    }
  },

  listeners: {
    effectActivated() {
      this.target.say("<yellow>Others begin to look at you with unbridled distaste.</yellow>");
    },

    /**
     * Discharges the effect after a social check (Charisma-based)
     */
    onSkillCheck(skill) {
      if (skill.attribute === 'charisma') {
        this.target.say("<red>The aura of abhorrence flares, sabotaging your words!</red>");
        // The effect is "discharged" after the first check per some versions
        this.remove(); 
      }
    },

    effectDeactivated() {
      this.target.say("<cyan>The greasy sensation fades; you no longer feel like a pariah.</cyan>");
    }
  }
};
