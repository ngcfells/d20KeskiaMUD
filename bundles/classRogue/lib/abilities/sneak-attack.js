'use strict';

module.exports = {
  /**
   * Calculates extra sneak attack damage if applicable.
   */
  getExtraDamage(player, target) {
    if (!player.hasAbility('sneak_attack_1d6')) return 0;

    // Check for "Flat-footed" or "Flanking" status
    const isVulnerable = target.hasEffect('flat_footed') || target.hasEffect('flanked');
    
    if (isVulnerable) {
      // Roll 1d6
      return Math.floor(Math.random() * 6) + 1;
    }
    
    return 0;
  }
};
