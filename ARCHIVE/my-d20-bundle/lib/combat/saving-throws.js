// path: ../bundles/my-d20-bundle/lib/combat/saving-throws.js

'use strict';

const D20Utils = require('../d20/d20Utils');
module.exports = {
  /**
   * Perform a saving throw.
   * @param {Character} character
   * @param {string} saveType 'fortitude' | 'reflex' | 'will'
   * @param {number} dc The difficulty class to beat
   */
  check(character, saveType, dc) {
    const roll = Math.floor(Math.random() * 20) + 1;
    
    // 1. D20 Standard: Natural 1 is automatic failure, Natural 20 is automatic success
    if (roll === 1) {
      return { success: false, total: 1, roll, auto: 'fail' };
    }
    if (roll === 20) {
      return { success: true, total: 20 + 99, roll, auto: 'success' };
    }

    // 2. Get Base Save from Class Metadata (set during character creation/setup)
    const base = character.getMeta(`base_${saveType}`) || 0;
    
    // 3. Map Save type to correct Attribute
    let attr = 'wisdom';
    if (saveType === 'fortitude') attr = 'constitution';
    if (saveType === 'reflex') attr = 'dexterity';
    
    const attrScore = character.getAttribute(attr) || 10;
    const mod = D20Utils.getModifier(attrScore);

    // 4. Calculate Total
    let total = roll + base + mod;

    // 5. Paladin Logic: Divine Grace
    // Adds Charisma modifier (if positive) to all saving throws
    if (character.hasAbility('divine_grace') && !character.getMeta('isFallen')) {
      const chaScore = character.getAttribute('charisma') || 10;
      const divineBonus = Math.max(0, D20Utils.getModifier(chaScore));
      if (divineBonus > 0) {
        total += divineBonus;
      }
    }

    const success = total >= dc;

    // Provide feedback for successful saves
    if (success) {
      character.say(`<green>You successfully resist the effect! (${saveType.toUpperCase()})</green>`);
    }

    return {
      success,
      total,
      roll,
      dc
    };
  }
};

