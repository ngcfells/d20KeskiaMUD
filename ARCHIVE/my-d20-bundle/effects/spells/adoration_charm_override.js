'use strict';

module.exports = {
  config: {
    name: "Adoration Charm",
    description: "You are magically compelled to adore your former persecutor.",
    type: "condition",
    family: "charm",
    tier: 3,
    duration: 6000
  },

  modifiers: {
    attributes: {
      // Massive penalty to Will saves against the caster
      will: -4,
      appearance: 2 // Flushed/Adoring look
    }
  },

  listeners: {
    effectActivated() {
      this.target.addTag('is_charmed');
      this.target.addTag('is_willing');
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('is_charmed');
      target.removeTag('is_willing');
      
      // Resume suppressed fear if it hasn't expired
      const state = this.gameState;
      const fear = Array.from(target.effects.effects).find(e => e.id === this.state.suppressedEffectId);
      if (fear && fear.resume) fear.resume();
    }
  }
};
