'use strict';

const TQ = require('../TraitQuery');

module.exports = {
  getHungerMode(entity) {
    if (TQ.has(entity, 'physiology_construct_metabolism')) return 'none';
    if (TQ.has(entity, 'physiology_undead_metabolism')) return 'none';
    if (TQ.has(entity, 'physiology_ooze_osmotic_metabolism')) return 'osmotic';
    if (TQ.has(entity, 'physiology_elemental_core')) return 'energy';

    if (TQ.has(entity, 'physiology_herbivore')) return 'herbivore';
    if (TQ.has(entity, 'physiology_carnivore')) return 'carnivore';
    if (TQ.has(entity, 'physiology_omnivore')) return 'omnivore';

    return 'omnivore'; // default for humanoids
  }
};
