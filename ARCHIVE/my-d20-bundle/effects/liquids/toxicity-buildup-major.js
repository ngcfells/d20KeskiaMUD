'use strict';

module.exports = {
  config: {
    name: 'Major Toxicity Buildup',
    description: 'Dangerous toxins saturate your body.',
    type: 'debuff',
  },

  state: {
    fortPenalty: -2,
    strengthPenalty: -1,
  },

  apply: (effect, target) => {
    target.modifyAttribute('fortitude', effect.state.fortPenalty);
    target.modifyAttribute('strength', effect.state.strengthPenalty);
    const current = target.getMeta('toxicity') || 0;
    target.setMeta('toxicity', current + 2);
  },

  remove: (effect, target) => {
    target.modifyAttribute('fortitude', -effect.state.fortPenalty);
    target.modifyAttribute('strength', -effect.state.strengthPenalty);
  }
};
