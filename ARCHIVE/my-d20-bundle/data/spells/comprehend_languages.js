/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/comprehend_languages.js
 */
'use strict';

module.exports = {
  id: 'comprehend_languages',
  name: 'Comprehend Languages',
  level: 1,
  school: 'divination',
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  materialComponents: [{ id: 'pinch_of_soot', quantity: 1, consumed: true }],
  range: 'personal',
  target: 'self',
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    target.addEffect('comprehending_languages');
    caster.say("You understand the literal meaning of any language you hear or read.");
  }
};
