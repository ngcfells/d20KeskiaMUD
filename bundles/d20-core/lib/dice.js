'use strict';

module.exports = {
  roll(formula) {
    // stub: expand later
    const match = /^(\d+)d(\d+)([+-]\d+)?$/.exec(formula.trim());
    if (!match) return 0;
    const [, countStr, sidesStr, modStr] = match;
    const count = parseInt(countStr, 10);
    const sides = parseInt(sidesStr, 10);
    const mod = modStr ? parseInt(modStr, 10) : 0;
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += 1 + Math.floor(Math.random() * sides);
    }
    return total + mod;
  },
};
