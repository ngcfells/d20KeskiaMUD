/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/create_greater_undead.js
 */
'use strict';

module.exports = {
  id: 'create_greater_undead',
  name: 'Create Greater Undead',
  level: 8,
  school: 'necromancy',
  descriptors: ['evil'],
  castingTime: '1 hour',
  components: ['V', 'S', 'M'],
  range: 'close',
  target: 'one corpse',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You bind a powerful soul into the remains, raising a Shadow, Wraith, or Spectre.");
  }
};
