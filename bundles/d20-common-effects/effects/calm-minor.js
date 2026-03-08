'use strict';

module.exports = {
  config: {
    name: 'Calm',
    description: 'You feel relaxed and centered.',
    type: 'buff',
  },

  state: {
    will: 1,
  },

  apply: (effect, player) => {
    player.modifyAttribute('will', effect.state.will);
  },

  remove: (effect, player) => {
    player.modifyAttribute('will', -effect.state.will);
  }
};
