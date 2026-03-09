'use strict';

module.exports = {
  config: {
    name: 'Unholy Water Burn',
    description: 'Burns good-aligned creatures and celestials.',
    type: 'damage',
  },

  state: {
    damage: 6,
  },

  apply: (effect, target) => {
    const alignment = target.getMeta('alignment');
    const creatureType = target.getMeta('creature_type');

    if (alignment === 'good' || creatureType === 'celestial') {
      target.damage(effect.state.damage);
    }
  },

  remove: () => {}
};
