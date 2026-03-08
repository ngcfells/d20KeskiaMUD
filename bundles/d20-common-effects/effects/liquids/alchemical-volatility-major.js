'use strict';

module.exports = {
  config: {
    name: 'Major Alchemical Volatility',
    description: 'You are a walking alchemical hazard.',
    type: 'utility',
  },

  state: {
    volatility: 3,
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
