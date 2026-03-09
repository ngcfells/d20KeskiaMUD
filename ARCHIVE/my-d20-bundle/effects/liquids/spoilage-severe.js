'use strict';

module.exports = {
  config: {
    name: 'Severe Spoilage',
    description: 'The liquid is foul and potentially dangerous.',
    type: 'debuff',
  },

  state: {
    fortPenalty: -2,
    staminaPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortPenalty);
    target.modifyAttribute('stamina', effect.state.staminaPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortPenalty);
    target.modifyAttribute('stamina', -effect.state.staminaPenalty);
  }
};
