'use strict';

module.exports = {
  /**
   * Check if attacker has higher ground/charge bonuses
   */
  getMountBonuses(attacker) {
    if (!attacker.getMeta('isMounted')) return 0;

    let bonus = 1; // +1 for higher ground vs non-mounted targets
    if (attacker.hasFeat('mounted_combat')) {
      // Logic for negating hits on mount could go here via an Effect
    }

    return bonus;
  }
};
