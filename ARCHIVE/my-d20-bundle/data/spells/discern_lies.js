/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/discern_lies.js
 */
'use strict';

module.exports = {
  id: 'discern_lies',
  name: 'Discern Lies',
  level: 4,
  school: 'divination',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'close',
  target: 'one creature/level',
  duration: 'concentration, up to 1 round/level',
  savingThrow: 'will',
  spellResistance: false,
  requiresConcentration: true,

  onCast(state, caster, target, ctx) {
    caster.say("You can see the subtle ripples in the weave when a target speaks a lie.");
  }
};
