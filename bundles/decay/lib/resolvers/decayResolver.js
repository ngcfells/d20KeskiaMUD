// bundles/decay/lib/resolvers/decayResolver.js
'use strict';

const TQ = require('../TraitQuery');

module.exports = {
  /**
   * Returns:
   *   false       → does not decay
   *   'reform'    → oozes
   *   'dissipate' → elementals
   *   'fade'      → spirits
   *   'compost'   → plants
   *   'rot'       → animals, humanoids, giants, etc.
   */
  getDecayMode(entity) {
    if (TQ.any(entity, ['undead.', 'construct.'])) return false;
    if (TQ.hasTrait(entity, 'ooze.')) return 'reform';
    if (TQ.hasTrait(entity, 'elemental.')) return 'dissipate';
    if (TQ.hasTrait(entity, 'spirit.')) return 'fade';
    if (TQ.hasTrait(entity, 'plant.')) return 'compost';

    return 'rot';
  },

  shouldDecay(entity) {
    return this.getDecayMode(entity) !== false;
  }
};
