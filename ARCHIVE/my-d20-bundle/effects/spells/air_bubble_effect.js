// path: ./bundles/my-d20-bundle/effects/spells/air_bubble_effect.js
'use strict';

module.exports = {
  config: {
    name: "Air Bubble",
    description: "Breathable air globe. Immune to drowning and inhaled poisons.",
    type: "buff",
    family: "adaptation",
    tier: 1
  },

  state: {},

  listeners: {
    effectActivated() {
      this.target.addTag('can_breathe_underwater');
      this.target.addTag('immune_inhaled_poison');
    },

    /**
     * Engine Hook: Suffocation
     */
    onCheckSuffocation(checkData) {
      if (checkData.environment === 'water' || checkData.environment === 'vacuum') {
        checkData.canBreathe = true;
        checkData.bypassMessage = "You breathe deeply from the shimmering bubble around your head.";
      }
    },

    /**
     * Engine Hook: Verbal Casting
     * Allows 'V' components to succeed automatically in water.
     */
    onBeforeSpellCast(castCtx) {
      if (this.target.room.hasTag('underwater')) {
        castCtx.verbalSuccess = true; 
        this.target.say("<cyan>The bubble allows your incantation to resonate clearly despite the depths.</cyan>");
      }
    },

    /**
     * Engine Hook: Gas Hazards
     */
    onInhaledEffect(hazard) {
      hazard.cancelled = true;
      this.target.say("<cyan>The air bubble filters out the toxic vapors.</cyan>");
    },

    effectDeactivated() {
      this.target.removeTag('can_breathe_underwater');
      this.target.removeTag('immune_inhaled_poison');
      this.target.say("<red>Your air bubble pops with a soft 'phut' sound, leaving you to the mercy of the environment.</red>");
    }
  }
};
