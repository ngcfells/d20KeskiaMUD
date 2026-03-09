'use strict';

module.exports = {
  config: {
    name: 'Unstable Planar Fusion',
    description: 'Planar energies fluctuate unpredictably.',
    type: 'mixed',
  },

  state: {
    fortBonus: 1,
    willPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortBonus);
    target.modifyAttribute('will', effect.state.willPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortBonus);
    target.modifyAttribute('will', -effect.state.willPenalty);
  }
};
