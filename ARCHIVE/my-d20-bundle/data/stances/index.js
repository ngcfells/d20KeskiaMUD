'use strict';

module.exports = {
  stances: {
    neutral: { attackBonus: 0, damageBonus: 0, defenseBonus: 0, perceptionBonus: 0 },
    aggressive: { attackBonus: +1, damageBonus: +2, defenseBonus: -1, perceptionBonus: -1 },
    defensive: { attackBonus: -1, damageBonus: 0, defenseBonus: +2, perceptionBonus: 0 },
    perceptive: { attackBonus: 0, damageBonus: 0, defenseBonus: 0, perceptionBonus: +3 }
  }
};
