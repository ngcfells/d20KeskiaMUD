'use strict';

module.exports = {
  config: {
    name: 'Axiomatic Influence',
    description: 'A lawful planar essence subtly shifts your alignment.',
    type: 'alignment',
  },

  state: {
    shift: +1,
  },

  apply: (effect, target) => {
    const current = target.getMeta('lawChaos') || 0;
    target.setMeta('lawChaos', current + effect.state.shift);
  },

  remove: () => {}
};
