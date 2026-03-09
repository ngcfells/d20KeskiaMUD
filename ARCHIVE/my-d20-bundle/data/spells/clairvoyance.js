/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/clairvoyance.js
 */
'use strict';

module.exports = {
  id: 'clairvoyance',
  name: 'Clairvoyance',
  level: 3,
  school: 'divination',
  subschool: 'scrying',
  castingTime: '10 minutes',
  components: ['V', 'S', 'F/M'],
  range: 'long',
  target: 'self',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Your senses drift to a distant location, allowing you to see or hear.");
  }
};
