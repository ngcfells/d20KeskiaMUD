'use strict';

module.exports = {
  config: {
    name: 'Caffeinated (Strong)',
    description: 'Highly energized.',
    type: 'buff',
  },

  state: {
    initiative: 2,
    reflex: 1,
  },

  apply: (effect, player) => {
    player.modifyAttribute('initiative', effect.state.initiative);
    player.modifyAttribute('reflex', effect.state.reflex);
  },

  remove: (effect, player) => {
    player.modifyAttribute('initiative', -effect.state.initiative);
    player.modifyAttribute('reflex', -effect.state.reflex);
  }
};
