'use strict';

module.exports = {
  config: {
    name: 'Greater Warmth',
    description: 'You are strongly protected against cold.',
    type: 'buff',
  },

  state: {
    coldResist: 5,
  },

  apply: (effect, target) => {
    const current = target.getMeta('cold_resist') || 0;
    target.setMeta('cold_resist', current + effect.state.coldResist);
  },

  remove: (effect, target) => {
    const current = target.getMeta('cold_resist') || 0;
    target.setMeta('cold_resist', current - effect.state.coldResist);
  }
};
