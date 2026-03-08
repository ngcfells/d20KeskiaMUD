'use strict';

const TQ = require('../TraitQuery');

module.exports = {
  getSleepMode(entity) {
    if (TQ.has(entity, 'physiology_synthetic_cognition')) return 'none';
    if (TQ.has(entity, 'physiology_psionic_cognition')) return 'trance';
    if (TQ.has(entity, 'physiology_eldritch_cognition')) return 'dreamless';
    if (TQ.has(entity, 'physiology_hive_cognition')) return 'hive';

    return 'sleep';
  }
};
