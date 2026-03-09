'use strict';

module.exports = {
  config: {
    name: 'Energy Surge',
    description: 'You feel supercharged and alert.',
    type: 'buff',
  },

  state: {
    staminaBonus: 2,
    reflexBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('stamina', effect.state.staminaBonus);
    target.modifyAttribute('reflex', effect.state.reflexBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('stamina', -effect.state.staminaBonus);
    target.modifyAttribute('reflex', -effect.state.reflexBonus);
  }
};
