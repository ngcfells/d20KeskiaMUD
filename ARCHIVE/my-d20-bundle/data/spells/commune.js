/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/commune.js
 */
'use strict';

module.exports = {
  id: 'commune',
  name: 'Commune',
  level: 5,
  school: 'divination',
  descriptors: [],
  castingTime: '10 minutes',
  components: ['V', 'S', 'M', 'DF', 'XP'],
  range: 'personal',
  target: 'self',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You reach out to your deity for simple 'yes' or 'no' answers.");
  }
};
