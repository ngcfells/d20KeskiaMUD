/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dancing_lights.js
 */
'use strict';

module.exports = {
  id: 'dancing_lights',
  name: 'Dancing Lights',
  level: 0,
  school: 'evocation',
  subschool: null,
  descriptors: ['light'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'self-centered emanation',
  duration: '1 minute',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("Four flickering lights manifest and dance through the air at your command.");
  }
};
