'use strict';

module.exports = {
  /**
   * D20 Monk Unarmed Damage Table (Medium size)
   * Levels 1-3: 1d6
   * Levels 4-7: 1d8
   * Levels 8-11: 1d10
   * Levels 12-15: 2d6
   * Levels 16-19: 2d8
   * Level 20: 2d10
   */
  getUnarmedDice(level, size = 'medium') {
    if (size === 'small') {
      if (level <= 3) return '1d4';
      if (level <= 7) return '1d6';
      if (level <= 11) return '1d8';
      if (level <= 15) return '1d10';
      if (level <= 19) return '2d6';
      return '2d8';
    }

    // Medium scaling
    if (level <= 3) return '1d6';
    if (level <= 7) return '1d8';
    if (level <= 11) return '1d10';
    if (level <= 15) return '2d6';
    if (level <= 19) return '2d8';
    return '2d10';
  }
};
