'use strict';

module.exports = {
  config: {
    name: 'Shadowfell Chill',
    description: 'A necrotic chill weakens your resolve.',
    type: 'debuff',
  },

  state: {
    strengthPenalty: -1,
    willPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('strength', effect.state.strengthPenalty);
    target.modifyAttribute('will', effect.state.willPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('strength', -effect.state.strengthPenalty);
    target.modifyAttribute('will', -effect.state.willPenalty);
  }
};
