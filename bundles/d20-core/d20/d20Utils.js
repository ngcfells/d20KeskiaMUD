'use strict';

class D20Utils {
  /**
   * Rolls 4d6 and drops the lowest value.
   * @return {number}
   */
  static rollStat() {
    const rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    rolls.sort((a, b) => a - b);
    rolls.shift(); // Remove the lowest (index 0 after sort)
    return rolls.reduce((acc, val) => acc + val, 0);
  }

  /**
   * Get modifier for a d20 score ( (score - 10) / 2 )
   */
  static getModifier(score) {
    return Math.floor((score - 10) / 2);
  }

  /**
 * Calculates Armor Training scaling bonuses.
 */
  static getArmorTraining(character) {
    const fighterLevel = character.getMeta('class_levels')?.fighter || 0;
    if (fighterLevel < 3) {
      return { bonus: 0, mediumSpeed: false, heavySpeed: false };
    }
    // Scaling: +1 at 3rd, +2 at 7th, +3 at 11th, +4 at 15th
    const bonus = Math.min(4, Math.floor((fighterLevel - 3) / 4) + 1);
    return {
      bonus,
      mediumSpeed: true, // Always true if Lv 3+
      heavySpeed: fighterLevel >= 7
    };
  }
}

module.exports = D20Utils;
