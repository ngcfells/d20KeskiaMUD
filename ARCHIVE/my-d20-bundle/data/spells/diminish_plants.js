/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/diminish_plants.js
 */
'use strict';

module.exports = {
  id: 'diminish_plants',
  name: 'Diminish Plants',
  level: 3,
  school: 'transmutation',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'long',
  target: 'area',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Lush vegetation withers or shrinks into a manageable state.");
  }
};
