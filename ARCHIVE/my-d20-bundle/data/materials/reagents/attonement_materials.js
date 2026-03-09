'use strict';

/**
 * Material Component: Incense (500 gp)
 * Source: Standard
 */
const atonement_incense = {
  id: 'incense_atonement',
  name: 'Rare Liturgical Incense',
  baseType: 'reagent',
  typicalValues: [500.0],
  metadata: {
    description: 'A blend of rare resins and oils used to purify the spirit during intercession.',
    rarity: 'rare',
    weight: 1.0,
    unitValue: 500.0,
    isStackable: true,
    tags: ['reagent', 'abjuration_component', 'divine_reagent']
  }
};

/**
 * Focus: Prayer Beads or similar item
 * Source: Standard
 */
const prayer_beads = {
  id: 'prayer_beads',
  name: 'Blessed Prayer Beads',
  baseType: 'focus',
  typicalValues: [1.0],
  metadata: {
    description: 'A string of polished wooden beads used to track the hour-long litany of atonement.',
    rarity: 'uncommon',
    weight: 0.2,
    unitValue: 1.0,
    isStackable: false,
    tags: ['focus', 'divine_focus', 'holy_item']
  }
};

module.exports = { atonement_incense, prayer_beads };
