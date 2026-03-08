'use strict';

module.exports = {
  config: {
    name: 'Active Fermentation',
    description: 'The brew is still fermenting and unstable.',
    type: 'mixed',
  },

  state: {
    alcoholBonus: 1,
    volatility: 1,
  },

  apply: (effect, target) => {
    const alc = target.getMeta('alcohol_potency') || 0;
    target.setMeta('alcohol_potency', alc + effect.state.alcoholBonus);

    const vol = target.getMeta('alchemical_volatility') || 0;
    target.setMeta('alchemical_volatility', vol + effect.state.volatility);
  },

  remove: (effect, target) => {
    const alc = target.getMeta('alcohol_potency') || 0;
    target.setMeta('alcohol_potency', alc - effect.state.alcoholBonus);

    const vol = target.getMeta('alchemical_volatility') || 0;
    target.setMeta('alchemical_volatility', vol - effect.state.volatility);
  }
};
