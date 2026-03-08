'use strict';

module.exports = {
  config: {
    name: 'Major Divine Infusion',
    description: 'You are suffused with powerful divine grace.',
    type: 'buff',
  },

  state: {
    willBonus: 2,
  },

  apply: (effect, target) => {
    target.modifyAttribute('will', effect.state.willBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('will', -effect.state.willBonus);
  }
};
