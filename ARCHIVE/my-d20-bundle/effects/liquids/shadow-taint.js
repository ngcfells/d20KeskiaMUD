'use strict';

module.exports = {
  config: {
    name: 'Shadow Taint',
    description: 'The Shadowfell clings to your soul.',
    type: 'debuff',
    tags: ['shadow'],
  },

  state: {
    willPenalty: -1,
    corruption: 1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('will', effect.state.willPenalty);
    const current = target.getMeta('shadow_corruption') || 0;
    target.setMeta('shadow_corruption', current + effect.state.corruption);
  },

  remove: (effect, target) => {
    target.modifyAttribute('will', -effect.state.willPenalty);
  }
};
