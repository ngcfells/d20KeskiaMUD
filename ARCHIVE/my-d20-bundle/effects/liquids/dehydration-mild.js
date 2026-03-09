'use strict';

module.exports = {
  config: {
    name: 'Mild Dehydration',
    description: 'You are a bit dehydrated.',
    type: 'debuff',
  },

  state: {
    staminaPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('stamina', effect.state.staminaPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('stamina', -effect.state.staminaPenalty);
  }
};
