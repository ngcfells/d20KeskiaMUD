'use strict';

module.exports = {
  config: {
    name: 'Minor Warmth',
    description: 'You feel pleasantly warm, resistant to mild cold.',
    type: 'buff',
  },

  state: {
    coldResist: 2,
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
