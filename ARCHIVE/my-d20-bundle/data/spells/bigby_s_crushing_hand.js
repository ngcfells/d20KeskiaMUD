/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/bigby_s_crushing_hand.js
 */
'use strict';

module.exports = {
  id: 'bigby_s_crushing_hand',
  name: 'Bigby\'s Crushing Hand',
  level: 9,
  school: 'evocation',
  descriptors: ['force'],
  castingTime: 'standard',
  components: ['V', 'S', 'M/F'],
  range: 'medium',
  target: 'creature',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say("A massive hand of force seizes the target and begins to squeeze.");
  }
};
