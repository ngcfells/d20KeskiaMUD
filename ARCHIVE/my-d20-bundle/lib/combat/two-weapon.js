'use strict';

module.exports = {
  /**
   * Get the attack penalties for dual wielding.
   * Standard D20: -6 Primary / -10 Off-hand
   */
  getPenalties(attacker) {
    let primary = -6;
    let offhand = -10;

    const hasTWF = attacker.hasFeat('two_weapon_fighting');
    const offhandItem = attacker.equipment.get('offhand');
    const isLight = offhandItem ? offhandItem.getMeta('isLight') : false;

    if (hasTWF) {
      primary = -4;
      offhand = -4;
    }

    // If the off-hand weapon is light, reduce penalties by 2
    if (isLight) {
      primary += 2;
      offhand += 2;
    }

    // Result with Feat + Light Weapon: -2 / -2
    return { primary, offhand };
  }
};
