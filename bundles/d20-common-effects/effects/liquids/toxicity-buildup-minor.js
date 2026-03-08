'use strict';

module.exports = {
  config: {
    name: 'Minor Toxicity Buildup',
    description: 'Low-level toxins accumulate in your system.',
    type: 'debuff',
  },

  state: {
    fortPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortPenalty);
    const current = target.getMeta('toxicity') || 0;
    target.setMeta('toxicity', current + 1);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortPenalty);
  }
};
