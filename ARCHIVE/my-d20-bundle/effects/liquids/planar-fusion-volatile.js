'use strict';

module.exports = {
  config: {
    name: 'Volatile Planar Fusion',
    description: 'Unstable planar energies erupt violently.',
    type: 'damage',
  },

  state: {
    damage: 12,
  },

  apply: (effect, target) => {
    target.damage(effect.state.damage);
  },

  remove: () => {}
};
