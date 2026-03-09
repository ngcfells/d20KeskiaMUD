/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/control_weather.js
 */
'use strict';

module.exports = {
  id: 'control_weather',
  name: 'Control Weather',
  level: 7,
  school: 'transmutation',
  castingTime: '10 minutes',
  components: ['V', 'S'],
  range: '2 miles',
  target: 'area around caster',
  duration: '4d12 hours',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You reach into the atmosphere to reshape the local climate.");
  }
};
