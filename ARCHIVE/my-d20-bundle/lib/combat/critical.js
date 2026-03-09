'use strict';

module.exports = {
  /**
   * Determine if a natural roll is a critical threat.
   * @param {Character} attacker
   * @param {number} naturalRoll The raw 1-20 roll
   */
  isThreat(attacker, naturalRoll) {
    const weapon = attacker.equipment.get('mainhand');
    
    // Default: Only 20 is a threat. 
    // Weapons can override this, e.g., Rapier 18-20.
    const critThreshold = weapon ? (weapon.getMeta('critThreshold') || 20) : 20;

    return naturalRoll >= critThreshold;
  },

  /**
   * Resolve a crit threat. In D20, you must "confirm" the crit.
   * Standard House Rule: If you think it's too slow, skip the confirm roll.
   */
  confirm(attacker, target, attackRollLogic) {
    // To confirm, roll again. If the second roll hits the AC, it's a crit.
    const confirmation = attackRollLogic.resolve(attacker, target);
    return confirmation.hit;
  }
};
