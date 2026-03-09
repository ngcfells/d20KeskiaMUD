'use strict';

const polymorph = require('../../lib/d20/polymorph');
const forms = require('../../lib/d20/polymorph-forms');

module.exports = {
  id: 'polymorph',
  name: 'Polymorph',
  level: 4,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  range: 'personal',
  target: 'self',
  duration: '1 min/level',
  savingThrow: 'none',
  spellResistance: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const formName = ctx?.args?.trim?.().toLowerCase();
    if (!formName) return caster.say(`Name a creature form.`);

    const form =
      forms.animals[formName] ||
      forms.magicalBeasts[formName] ||
      forms.vermin[formName];

    if (!form) return caster.say(`Unknown form.`);

    polymorph.startPolymorph(state, caster, 'polymorph', {
      formName,
      formCategory: 'creature',
      tier: 2,
      size: form.size,
      bonuses: form.bonuses
    });

    caster.say(`You transform into a ${formName}.`);
  },

  onEnd(state, caster) {
    polymorph.endPolymorph(state, caster, 'polymorph');
    caster.say(`You return to your normal form.`);
  }
};
