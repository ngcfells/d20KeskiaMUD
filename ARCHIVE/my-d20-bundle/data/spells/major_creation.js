/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/major_creation.js
 */
'use strict';

module.exports = {
  id: 'major_creation',
  name: 'Major Creation',
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  castingTime: '10 minutes',
  components: ['V', 'S', 'M'],
  range: 'close',
  target: 'area',
  duration: 'special', // Based on material
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You pull complex mineral or metal matter from the shadows into reality.");
  }
};
