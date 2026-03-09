'use strict';

const D20Utils = require('../D20Utils');

module.exports = {
  /**
   * @param {number} damageTaken Damage recently suffered
   * @param {number} spellLevel
   */
  check(player, damageTaken = 0, spellLevel = 1) {
    const roll = Math.floor(Math.random() * 20) + 1;
    const conMod = D20Utils.getModifier(player.getAttribute('constitution') || 10);
    
    // Use the canonical skill key we defined in SkillManager
    const ranks = player.getMeta('skills')?.concentration || 0;
    
    const dc = 10 + damageTaken + spellLevel;
    const total = roll + ranks + conMod;

    return {
      success: total >= dc,
      total,
      dc
    };
  }
};
