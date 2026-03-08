'use strict';

const TQ = require('../TraitQuery');

module.exports = {
  getAgingRate(entity) {
    if (TQ.has(entity, 'physiology_immortal')) return 0;
    if (TQ.has(entity, 'physiology_ageless')) return 0;
    if (TQ.has(entity, 'physiology_slow_aging')) return 0.5;
    if (TQ.has(entity, 'physiology_fast_aging')) return 2;

    return 1; // standard aging
  }
};
