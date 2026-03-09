/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/minor_creation.js
 */
'use strict';

module.exports = {
  id: 'minor_creation',
  name: 'Minor Creation',
  level: 4,
  school: 'conjuration',
  subschool: 'creation',
  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  range: 'close',
  target: 'area',
  duration: '1 hour/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Vegetable matter weaves itself together from thin air.");
  }
};
