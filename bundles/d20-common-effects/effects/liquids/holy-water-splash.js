'use strict';

module.exports = {
  config: {
    name: 'Holy Water Burn',
    description: 'Burns undead and evil-aligned creatures.',
    type: 'damage',
  },

  state: {
    damage: 6,
  },

  apply: (effect, target) => {
    const alignment = target.getMeta('alignment');
    const creatureType = target.getMeta('creature_type');

    if (alignment === 'evil' || creatureType === 'undead') {
      target.damage(effect.state.damage);
    }
  },

  remove: () => {}
};
