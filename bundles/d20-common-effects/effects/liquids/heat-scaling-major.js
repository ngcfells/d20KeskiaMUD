'use strict';

module.exports = {
  config: {
    name: 'Major Heat Reserve',
    description: 'You are strongly resistant to heat.',
    type: 'buff',
  },

  state: {
    heatResist: 5,
  },

  apply: (effect, target) => {
    const current = target.getMeta('heat_resist') || 0;
    target.setMeta('heat_resist', current + effect.state.heatResist);
  },

  remove: (effect, target) => {
    const current = target.getMeta('heat_resist') || 0;
    target.setMeta('heat_resist', current - effect.state.heatResist);
  }
};
