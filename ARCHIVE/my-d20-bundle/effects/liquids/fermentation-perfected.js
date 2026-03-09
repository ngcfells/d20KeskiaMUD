'use strict';

module.exports = {
  config: {
    name: 'Perfected Fermentation',
    description: 'The brew has reached ideal flavor and potency.',
    type: 'buff',
  },

  state: {
    moraleBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('charisma', effect.state.moraleBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('charisma', -effect.state.moraleBonus);
  }
};
