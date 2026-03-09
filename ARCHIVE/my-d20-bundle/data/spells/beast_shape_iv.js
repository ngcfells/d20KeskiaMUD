'use strict';

const polymorph = require('../../lib/d20/polymorph');
const forms = require('../../lib/d20/polymorph-forms');

module.exports = {
  id: 'beast_shape_iv',
  name: 'Beast Shape IV',
  level: 6,
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
    if (!formName) {
      return caster.say(`<cyan>You must name a powerful animal or magical beast form.</cyan>`);
    }

    const form =
      forms.animals[formName] ||
      forms.magicalBeasts[formName];

    if (!form) return caster.say(`<red>No such animal or magical beast form is available.</red>`);

    const bonuses = {
      naturalArmor: (form.bonuses.naturalArmor || 0) + 4,
      abilityMods: {
        ...(form.bonuses.abilityMods || {}),
        str: (form.bonuses.abilityMods?.str || 0) + 6,
        dex: (form.bonuses.abilityMods?.dex || 0) + 4,
        con: (form.bonuses.abilityMods?.con || 0) + 4
      }
    };

    polymorph.startPolymorph(state, caster, 'polymorph', {
      formName,
      formCategory: 'animal_or_magical_beast',
      tier: 4,
      size: form.size,
      bonuses
    });

    caster.say(`<yellow>You assume a fearsome ${formName} form, brimming with primal power.</yellow>`);
  },

  onEnd(state, caster) {
    polymorph.endPolymorph(state, caster, 'polymorph');
    caster.say(`<cyan>You return to your normal form.</cyan>`);
  }
};
