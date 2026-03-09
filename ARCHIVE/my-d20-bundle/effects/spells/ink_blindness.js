'use strict';

/**
 * Ink Blindness Effect
 * --------------------
 * 1. Grants the 'blind' condition (Total concealment for others, 50% miss chance).
 * 2. Special Interaction: This is a Phantasm. While 'Remove Blindness' works, 
 *    the 'Erase' spell can also clear this specific effect by unmaking the phantasmal ink.
 */
module.exports = {
  config: {
    name: "Scrivener's Retribution",
    description: "Your vision is completely occluded by phantasmal ink blots.",
    type: "condition",
    family: "illumination",
    tier: 2, // Illuminated (Inverse)
    isMagical: true
  },
  state: {
      casterId: null
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      target.addBehavior('blind');
      
      // Secondary Phantasm Effect: Rattled (Tier 1 Fear)
      const rattled = target.gameState.EffectFactory.create('rattled', {
          config: { duration: 18000 } // 3 rounds of initial shock
      });
      target.addEffect(rattled);
    },

    effectDeactivated() {
      const target = this.target;
      target.removeBehavior('blind');
      target.say("<cyan>The black blots of the Scrivener's Retribution finally dissolve. The world rushes back into view, though your eyes still sting with the phantom ink.</cyan>");
    },

    /**
     * Unique Counter-play: Erase spell interaction.
     */
    onErase: state => function (result) {
        this.target.say("<yellow>The unmaking magic of the Erase spell scrubs the phantasmal ink from your sight!</yellow>");
        this.remove();
        result.success = true;
    },

    /**
     * Blindness Mechanics: Automatic fail on vision-based checks.
     */
    onCheckPerception: state => function (data) {
        if (data.type === 'sight') {
            data.autoFail = true;
            this.target.say("<grey>You see nothing but expanding black blots.</grey>");
        }
    }
  }
};
