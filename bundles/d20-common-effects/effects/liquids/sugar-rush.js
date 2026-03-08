'use strict';

module.exports = {
  config: {
    name: 'Sugar Rush',
    description: 'A burst of energy from a sugar high.',
    type: 'buff',
  },

  state: {
    initiativeBonus: 2,
    reflexBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('initiative', effect.state.initiativeBonus);
    target.modifyAttribute('reflex', effect.state.reflexBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('initiative', -effect.state.initiativeBonus);
    target.modifyAttribute('reflex', -effect.state.reflexBonus);
  }
};
