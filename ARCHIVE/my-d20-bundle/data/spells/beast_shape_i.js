'use strict';

const polymorph = require('../../lib/d20/polymorph');
const forms = require('../../lib/d20/polymorph-forms');

module.exports = {
  id: 'beast_shape_i',
  name: 'Beast Shape I',
  level: 3,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 min/level',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const formName = ctx?.args?.trim?.().toLowerCase();
    if (!formName) return caster.say(`<cyan>You must name a Small or Medium animal form.</cyan>`);

    const form = forms.animals[formName];
    if (!form) return caster.say(`<red>No such animal form is available.</red>`);

    if (!['small', 'medium'].includes(form.size)) {
      return caster.say(`<red>Beast Shape I only allows Small or Medium animals.</red>`);
    }

    polymorph.startPolymorph(state, caster, 'polymorph', {
      formName,
      formCategory: 'animal',
      tier: 1,
      size: form.size,
      bonuses: form.bonuses
    });

    caster.say(`<yellow>You assume the form of a ${formName}.</yellow>`);
  },

  onEnd(state, caster) {
    polymorph.endPolymorph(state, caster, 'polymorph');
    caster.say(`<cyan>You return to your normal form.</cyan>`);
  }
};
