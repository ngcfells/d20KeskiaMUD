'use strict';

module.exports = {
  config: {
    name: 'Lethean Forgetfulness',
    description: 'A soft haze clouds your mind.',
    type: 'mental',
  },

  state: {
    intelligencePenalty: -2,
  },

  apply: (effect, target) => {
    target.modifyAttribute('intelligence', effect.state.intelligencePenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('intelligence', -effect.state.intelligencePenalty);
  }
};
