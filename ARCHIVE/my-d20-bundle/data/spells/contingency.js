/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/contingency.js
 */
'use strict';

module.exports = {
  id: 'contingency',
  name: 'Contingency',
  level: 6,
  school: 'evocation',
  castingTime: 'at least 10 minutes',
  components: ['V', 'S', 'M', 'F'],
  range: 'personal',
  target: 'self',
  duration: '1 day/level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You weave a dormant spell into your aura, waiting for its trigger.");
  }
};
