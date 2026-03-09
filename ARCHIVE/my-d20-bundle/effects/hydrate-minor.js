'use strict';

module.exports = {
  config: {
    name: 'Hydrated (Minor)',
    description: 'Slightly quenched and refreshed.',
    type: 'buff',
  },

  state: {
    hydration: 5,
  },

  apply: (effect, player) => {
    const current = player.getMeta('hydration') || 0;
    player.setMeta('hydration', current + effect.state.hydration);
  },

  remove: () => {}
};
