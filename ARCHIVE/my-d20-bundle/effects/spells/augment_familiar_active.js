'use strict';

/**
 * Augment Familiar Effect
 * -----------------------
 * Applies +2 enhancement to Str, Dex, and Con.
 * Manages the temporary +1 Hit Die lifecycle.
 */
module.exports = {
  config: {
    name: "Augmented Familiar",
    description: "Physical attributes and vitality are magically enhanced.",
    type: "condition",
    family: "transmutation",
    tier: 1,
    maxTier: 1
  },
  state: {
    hdBonus: 1
  },
  modifiers: {
    attributes: {
      strength: (current) => current + 2,
      dexterity: (current) => current + 2,
      constitution: (current) => current + 2
    }
  },
  listeners: {
    effectActivated() {
      const familiar = this.target;
      // Grant temporary Hit Die (which should trigger HP recalculation)
      if (familiar.gainHitDice) {
        familiar.gainHitDice(this.state.hdBonus);
      }
      familiar.say("<green>You feel a surge of unnatural vitality and strength!</green>");
    },
    effectDeactivated() {
      const familiar = this.target;
      // Remove temporary Hit Die
      if (familiar.loseHitDice) {
        familiar.loseHitDice(this.state.hdBonus);
      }
      familiar.say("<yellow>The surge of vitality fades, leaving you at your normal size.</yellow>");
    }
  }
};
