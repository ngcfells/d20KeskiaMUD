'use strict';

const polymorph = require('../../lib/d20/polymorph');
const forms = require('../../lib/d20/polymorph-forms');

module.exports = {
  id: 'beast_shape_ii',
  name: 'Beast Shape II',
  level: 4,
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
    if (!formName) return caster.say(`<cyan>You must name an animal form.</cyan>`);

    const form = forms.animals[formName];
    if (!form) return caster.say(`<red>No such animal form is available.</red>`);

    if (!['tiny', 'small', 'medium', 'large'].includes(form.size)) {
      return caster.say(`<red>Beast Shape II allows Tiny, Small, Medium, or Large animals.</red>`);
    }

    const bonuses = {
      naturalArmor: (form.bonuses.naturalArmor || 0) + 1,
      abilityMods: {
        ...(form.bonuses.abilityMods || {}),
        str: (form.bonuses.abilityMods?.str || 0) + 2,
        dex: (form.bonuses.abilityMods?.dex || 0) + 2
      }
    };

    polymorph.startPolymorph(state, caster, 'polymorph', {
      formName,
      formCategory: 'animal',
      tier: 2,
      size: form.size,
      bonuses
    });

    caster.say(`<yellow>You assume a more powerful ${formName} form.</yellow>`);
  },

  onEnd(state, caster) {
    polymorph.endPolymorph(state, caster, 'polymorph');
    caster.say(`<cyan>You return to your normal form.</cyan>`);
  }
};
