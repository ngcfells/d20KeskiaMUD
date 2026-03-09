'use strict';

module.exports = {
  config: {
    name: 'Caffeinated (Minor)',
    description: 'Slightly energized.',
    type: 'buff',
  },

  state: {
    initiative: 1,
  },

  apply: (effect, player) => {
    player.modifyAttribute('initiative', effect.state.initiative);
  },

  remove: (effect, player) => {
    player.modifyAttribute('initiative', -effect.state.initiative);
  }
};
