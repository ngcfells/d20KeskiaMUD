/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/dimension_door.js
 */
'use strict';

module.exports = {
  id: 'dimension_door',
  name: 'Dimension Door',
  level: 4,
  school: 'conjuration',
  subschool: 'teleportation',
  castingTime: 'standard',
  components: ['V'],
  range: 'long',
  target: 'self and objects or willing creatures',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("You instantly step through a rift in space to your destination.");
    // target.teleportTo(ctx.coords);
  }
};
