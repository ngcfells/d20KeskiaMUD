'use strict';

module.exports = {
  config: {
    name: 'Minor Morale Boost',
    description: 'You feel a little more confident and upbeat.',
    type: 'buff',
  },

  state: {
    charismaBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('charisma', effect.state.charismaBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('charisma', -effect.state.charismaBonus);
  }
};
