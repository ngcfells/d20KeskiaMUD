'use strict';

module.exports = {
  config: {
    name: 'Minor Alchemical Volatility',
    description: 'Your aura destabilizes nearby alchemical effects.',
    type: 'utility',
  },

  state: {
    volatility: 1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('alchemical_volatility') || 0;
    target.setMeta('alchemical_volatility', current + effect.state.volatility);
  },

  remove: (effect, target) => {
    const current = target.getMeta('alchemical_volatility') || 0;
    target.setMeta('alchemical_volatility', current - effect.state.volatility);
  }
};
