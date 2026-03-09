'use strict';

module.exports = {
  config: {
    name: 'Minor Healing',
    description: 'You recover a small amount of health.',
    type: 'heal',
  },

  state: {
    heal: 3,
  },

  apply: (effect, player) => {
    player.raiseAttribute('health', effect.state.heal);
  },

  remove: () => {}
};
