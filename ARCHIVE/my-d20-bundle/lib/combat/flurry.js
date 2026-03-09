'use strict';

module.exports = {
  /**
   * Get penalties/bonuses for Flurry of Blows
   * @param {Character} monk
   */
  getModifiers(monk) {
    if (!monk.hasAbility('flurry_of_blows')) return null;

    // Check if monk is wearing armor (Flurry only works unarmored)
    for (const [slot, item] of monk.equipment) {
      if (item.type === 'ARMOR' && item.getMeta('armorBonus') > 0) return null;
    }

    // Standard Lvl 1 Flurry: -2 penalty to all attacks, but adds an extra attack
    return {
      penalty: -2,
      extraAttacks: 1
    };
  }
};
