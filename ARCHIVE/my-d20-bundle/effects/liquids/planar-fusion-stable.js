'use strict';

module.exports = {
  config: {
    name: 'Stable Planar Fusion',
    description: 'Balanced planar energies bolster your resilience.',
    type: 'buff',
  },

  state: {
    fortBonus: 1,
    willBonus: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortBonus);
    target.modifyAttribute('will', effect.state.willBonus);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortBonus);
    target.modifyAttribute('will', -effect.state.willBonus);
  }
};
