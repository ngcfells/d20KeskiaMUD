'use strict';

module.exports = {
  config: {
    name: 'Caffeine Dependency',
    description: 'You suffer if you go too long without caffeine.',
    type: 'debuff',
  },

  state: {
    willPenalty: -1,
  },

  apply: (effect, target) => {
    target.setMeta('caffeine_dependent', true);
  },

  remove: (effect, target) => {
    target.setMeta('caffeine_dependent', false);
  }
};
