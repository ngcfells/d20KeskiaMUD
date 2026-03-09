'use strict';

module.exports = {
  config: {
    name: 'Minor Spoilage',
    description: 'The liquid tastes off and mildly upsets the stomach.',
    type: 'debuff',
  },

  state: {
    fortPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortPenalty);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortPenalty);
  }
};
