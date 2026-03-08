'use strict';

const TQ = require('../TraitQuery');

module.exports = {
  getRegenRate(entity) {
    if (TQ.has(entity, 'physiology_regeneration_fast')) return 2;
    if (TQ.has(entity, 'physiology_regeneration_slow')) return 0.5;
    if (TQ.has(entity, 'physiology_regeneration_none')) return 0;

    return 1;
  }
};
