// path: bundles/d20-combat/lib/anatomy/AnatomyRegistry.js
'use strict';

/**
 * Racially agnostic slot taxonomy.
 * Races declare their own anatomy lists using these slot names.
 */

module.exports = {
  // Single-slot wearable locations
  single: [
    'head',
    'eyes',
    'neck',
    'torso',
    'body',
    'shoulders',
    'arms',
    'hands',
    'waist',
    'legs',
    'feet',
    'wield',
    'offhand',
    'held'
  ],

  // Multi-slot wearable locations (race determines count)
  multi: [
    'earring',
    'wrists',
    'finger',
    'antenna',
    'eye_stalks'
  ],

  // Unlimited slots
  unlimited: [
    'ioun',
    'slotless'
  ]
};
