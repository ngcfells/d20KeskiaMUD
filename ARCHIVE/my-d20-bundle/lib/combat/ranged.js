'use strict';

const D20Utils = require('../d20/d20Utils');

module.exports = {
  /**
   * Calculate total modifiers for a ranged attack.
   * @param {Character} attacker
   * @param {Character} target
   * @param {Item} weapon
   */
  getModifiers(attacker, target, weapon) {
    let penalty = 0;

    // 1. Range Increments: -2 per increment beyond the first.
    const distance = attacker.room === target.room ? 10 : 30; // Mock distance for MUD rooms
    const increment = weapon.getMeta('rangeIncrement') || 20;
    if (distance > increment) {
      penalty -= (Math.floor(distance / increment) * 2);
    }

    // 2. Precise Shot: -4 if firing into melee without the feat.
    if (target.isInCombat() && !attacker.hasFeat('precise_shot')) {
      penalty -= 4;
    }

    // 3. Point Blank Shot: +1 if within 30ft.
    if (distance <= 30 && attacker.hasFeat('point_blank_shot')) {
      penalty += 1;
    }

    return penalty;
  }
};
