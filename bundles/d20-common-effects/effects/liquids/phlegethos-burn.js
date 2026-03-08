'use strict';

module.exports = {
  config: {
    name: 'Phlegethos Burn',
    description: 'Hellfire burns your flesh.',
    type: 'damage',
  },

  state: {
    damage: 10,
  },

  apply: (effect, target) => {
    target.damage(effect.state.damage);
  },

  remove: () => {}
};
