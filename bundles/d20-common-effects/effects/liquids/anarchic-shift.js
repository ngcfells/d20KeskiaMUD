'use strict';

module.exports = {
  config: {
    name: 'Anarchic Influence',
    description: 'Chaotic planar essence disrupts your moral balance.',
    type: 'alignment',
  },

  state: {
    shift: -1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('lawChaos') || 0;
    target.setMeta('lawChaos', current + effect.state.shift);
  },

  remove: () => {}
};
