
'use strict';

module.exports = {
  id: 'deflect_arrows',
  name: 'Deflect Arrows',
  category: 'other',
  type: 'feat',
  // TODO: merge in existing logic below if needed
};

'use strict';

/**
 * BUNDLE: feats
 * PATH: bundles/my-d20-bundle/data/feats/d/deflect_arrows.js
 */

module.exports = {
  id: "deflect_arrows",
  name: "Deflect Arrows",
  description: "You can knock a projectile out of the air with your bare hands.",
  category: "combat",
  prerequisites: {
    dexterity: 13, // Standard D20 requirement
    feats: ["improved_unarmed_strike"]
  },
  
  // Stance-based passive modifiers for the Combat Engine to read
  stanceEffects: {
    base: {
      can_deflect_physical: true
    },
    perceptive: {
      deflect_bonus: 2 // Bonus to the d20 roll in perceptiveness
    }
  },

  hooks: {
    /**
     * Optional hook to trigger a message when a deflection occurs
     */
    onDefense(attacker, defender, state) {
      // The actual math is in deflect.js, but we can hook flavor here
    }
  }
};
