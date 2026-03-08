'use strict';

module.exports = {
  config: {
    name: 'Planar Resonance (Chaos)',
    description: 'Your mind dances with chaotic impulses.',
    type: 'buff',
  },

  state: {
    luckBonus: 1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('luck') || 0;
    target.setMeta('luck', current + effect.state.luckBonus);
  },

  remove: (effect, target) => {
    const current = target.getMeta('luck') || 0;
    target.setMeta('luck', current - effect.state.luckBonus);
  }
};
