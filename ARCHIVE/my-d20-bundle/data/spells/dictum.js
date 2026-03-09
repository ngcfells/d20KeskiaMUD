/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dictum.js
 */
'use strict';

module.exports = {
  id: 'dictum',
  name: 'Dictum',
  level: 7,
  school: 'evocation',
  subschool: null,
  descriptors: ['lawful', 'sonic'],
  castingTime: 'standard',
  components: ['V'],
  range: '40 ft.',
  target: 'nonlawful creatures in area',
  duration: 'instantaneous',
  savingThrow: 'none/will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say("You utter a word of absolute law that shatters the chaotic.");
    // Logic: Effects (deafened, slowed, paralyzed, killed) based on HD vs CL.
  }
};
