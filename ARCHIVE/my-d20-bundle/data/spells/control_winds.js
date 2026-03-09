/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/control_winds.js
 */
'use strict';

module.exports = {
  id: 'control_winds',
  name: 'Control Winds',
  level: 5,
  school: 'transmutation',
  descriptors: ['air'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: '40 ft./level',
  target: 'self-centered emanation',
  duration: '10 min./level',
  savingThrow: 'fort',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You bend the air to your will, creating anything from a breeze to a tornado.");
  }
};
