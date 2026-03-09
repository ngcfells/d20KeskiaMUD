/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/creeping_doom.js
 */
'use strict';

module.exports = {
  id: 'creeping_doom',
  name: 'Creeping Doom',
  level: 7,
  school: 'conjuration',
  subschool: 'summoning',
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'swarms of centipedes',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("A carpet of thousands of biting insects swarms the area.");
  }
};
