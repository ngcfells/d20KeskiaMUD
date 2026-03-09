'use strict';

module.exports = {
  config: {
    name: 'Alcohol Tolerance',
    description: 'You handle alcohol better than most.',
    type: 'buff',
  },

  state: {
    tolerance: 1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('alcohol_tolerance') || 0;
    target.setMeta('alcohol_tolerance', current + effect.state.tolerance);
  },

  remove: (effect, target) => {
    const current = target.getMeta('alcohol_tolerance') || 0;
    target.setMeta('alcohol_tolerance', current - effect.state.tolerance);
  }
};
