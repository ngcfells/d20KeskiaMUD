'use strict';

module.exports = {
  config: {
    name: 'Minor Heat Reserve',
    description: 'You handle hot environments a bit better.',
    type: 'buff',
  },

  state: {
    heatResist: 2,
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
