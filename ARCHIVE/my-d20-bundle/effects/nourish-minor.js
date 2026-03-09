'use strict';

module.exports = {
  config: {
    name: 'Nourished',
    description: 'You feel lightly nourished.',
    type: 'buff',
  },

  state: {
    stamina: 1,
  },

  apply: (effect, player) => {
    player.modifyAttribute('stamina', effect.state.stamina);
  },

  remove: (effect, player) => {
    player.modifyAttribute('stamina', -effect.state.stamina);
  }
};
