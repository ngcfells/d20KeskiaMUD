// path: ./bundles/my-d20-bundle/effects/spells/brain_spore_infection.js
'use strict';

module.exports = {
  config: {
    name: "Brain Spore Infection",
    description: "Spores are consuming your brain tissue. Recurring Intelligence drain.",
    type: "condition",
    family: "disease",
    tier: 4
  },

  state: {
    dc: 16
  },

  listeners: {
    effectActivated() {
      // Immediate initial damage
      this.drainIntelligence();
    },

    /**
     * Recurring Save: Every round (6 seconds)
     */
    updateTick() {
      const target = this.target;
      const saveRoll = Math.floor(Math.random() * 20) + 1 + (target.getMeta('save_fortitude') || 0);

      if (saveRoll < this.state.dc) {
        this.drainIntelligence();
      } else {
        target.say("<cyan>Your constitution rallies; the spores stop spreading for a moment.</cyan>");
      }
    },

    drainIntelligence() {
      const target = this.target;
      const drain = Math.floor(Math.random() * 3) + 1; // 1d3
      
      // Ability Drain (Permanent per source, but we apply via attribute mod)
      target.addModifier('intelligence', -drain);
      
      target.say("<red><bold>The spores gnaw at your mind! You find it harder and harder to form even simple thoughts.</bold></red>");
      
      // Mechanical check for 0 Int (Comatose)
      if (target.getAttribute('intelligence') <= 0) {
        target.setAttribute('intelligence', 1); // Keep at 1 for MUD stability
        target.addEffect(this.state.EffectFactory.create('stunned', { duration: 60000 }));
        target.say("<white>Your mind goes blank. You have forgotten how to speak... how to think... how to be.</white>");
      }
    },

    effectDeactivated() {
      this.target.say("<yellow>The grey fog in your mind begins to lift, though your lost memories do not return.</yellow>");
    }
  }
};
