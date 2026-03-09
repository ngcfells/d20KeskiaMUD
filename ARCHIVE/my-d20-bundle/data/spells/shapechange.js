'use strict';

const polymorph = require('../../lib/d20/polymorph');
const forms = require('../../lib/d20/polymorph-forms');

module.exports = {
  id: 'shapechange',
  name: 'Shapechange',
  level: 9,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'personal',
  target: 'self',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const formName = ctx?.args?.trim?.().toLowerCase();
    if (!formName) return caster.say(`Name a form.`);

    const form =
      forms.animals[formName] ||
      forms.magicalBeasts[formName] ||
      forms.vermin[formName];

    if (!form) return caster.say(`Unknown form.`);

    polymorph.startPolymorph(state, caster, 'polymorph', {
      formName,
      formCategory: 'shapechange',
      tier: 5,
      size: form.size,
      bonuses: form.bonuses
    });

    caster.say(`Your form flows into that of a ${formName}.`);
  },

  onEnd(state, caster) {
    polymorph.endPolymorph(state, caster, 'polymorph');
    caster.say(`Your shapechanging power fades.`);
  }
};
