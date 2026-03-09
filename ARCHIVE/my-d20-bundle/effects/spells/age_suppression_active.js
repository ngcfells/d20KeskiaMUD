'use strict';

/**
 * Age Suppression Effect
 * ----------------------
 * A permanent chronomantic anchor. 
 * 1. Negates all physical attribute penalties from natural or magical aging.
 * 2. Prevents the 'Double Aging' curse from taking hold.
 */
module.exports = {
  config: {
    name: "Age Suppression",
    description: "Your biological clock is anchored to a static temporal point.",
    type: "spell_effect",
    unique: true,
    isMagical: true,
    persistsAcrossDeath: true
  },
  state: {
    physicalAnchor: 28 // The age Liang Chou appears to be
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      target.say("<cyan>The weight of years lifts from your shoulders. Your pulse slows to a perfect, rhythmic crawl.</cyan>");
      
      // Remove current aging penalties if any exist in metadata
      target.removeMeta('aging_penalties');
    },

    /**
     * Intercept and cancel incoming aging effects/curses.
     */
    onEffectAdd: state => function (effect, result) {
      if (effect.id === 'double_aging_effect' || effect.config.family === 'aging') {
        this.target.say("<white>The temporal corruption of the aging magic slides off your anchored timeline without effect.</white>");
        result.cancel = true;
      }
    },

    /**
     * Ensure the 'Examine' description reflects the agelessness.
     */
    onExamine: state => function (observer, description) {
      return description + `\n<cyan>They possess a preternatural stillness; time seems to have no claim on their features.</cyan>`;
    }
  }
};
