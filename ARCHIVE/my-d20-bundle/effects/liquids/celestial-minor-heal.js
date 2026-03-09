'use strict';

module.exports = {
  config: {
    name: 'Celestial Healing',
    description: 'A gentle radiance restores your vitality.',
    type: 'heal',
  },

  state: {
    heal: 5,
  },

  apply: (effect, target) => {
    target.raiseAttribute('health', effect.state.heal);
  },

  remove: () => {}
};
