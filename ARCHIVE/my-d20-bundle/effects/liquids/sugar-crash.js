'use strict';

module.exports = {
  config: {
    name: 'Sugar Crash',
    description: 'The crash after a sugar high.',
    type: 'debuff',
  },

  state: {
    initiativePenalty: -2,
    willPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('initiative', effect.state.initiativePenalty);
    target.modifyAttribute('will', effect.state.willPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('initiative', -effect.state.initiativePenalty);
    target.modifyAttribute('will', -effect.state.willPenalty);
  }
};
