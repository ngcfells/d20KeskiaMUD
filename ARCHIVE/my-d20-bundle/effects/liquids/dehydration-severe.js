'use strict';

module.exports = {
  config: {
    name: 'Severe Dehydration',
    description: 'You are dangerously dehydrated.',
    type: 'debuff',
  },

  state: {
    staminaPenalty: -2,
    strengthPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('stamina', effect.state.staminaPenalty);
    target.modifyAttribute('strength', effect.state.strengthPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('stamina', -effect.state.staminaPenalty);
    target.modifyAttribute('strength', -effect.state.strengthPenalty);
  }
};
