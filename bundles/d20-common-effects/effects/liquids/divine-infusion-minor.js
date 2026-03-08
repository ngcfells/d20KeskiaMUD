'use strict';

module.exports = {
  config: {
    name: 'Minor Divine Infusion',
    description: 'A gentle divine presence steadies your spirit.',
    type: 'buff',
  },

  state: {
    willBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('will', effect.state.willBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('will', -effect.state.willBonus);
  }
};
