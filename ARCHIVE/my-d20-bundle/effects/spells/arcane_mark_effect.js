'use strict';

/**
 * Arcane Mark Effect
 * -----------------
 * A permanent magical signature that persists on the target.
 */
module.exports = {
  config: {
    name: "Arcane Mark",
    description: "A permanent magical signature.",
    type: "spell_effect",
    unique: false, // Objects can be marked by multiple different casters
    isMagical: true
  },
  state: {
    casterName: 'Unknown',
    casterId: null,
    markDescription: ''
  },
  listeners: {
    /**
     * Integrates the mark into the object's description when looked at.
     */
    onExamine: state => function (observer, description) {
      // The mark is always visible unless specific 'See Invisibility' logic is added later.
      return description + `\n<cyan>A magical mark is etched here: ${this.state.markDescription} (signed by ${this.state.casterName}).</cyan>`;
    },

    /**
     * Interaction for removal via specific 'Erase' mechanics.
     */
    onErase: state => function (result) {
      this.remove();
      result.success = true;
    }
  }
};
