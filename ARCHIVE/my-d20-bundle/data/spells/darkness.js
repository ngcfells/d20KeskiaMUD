/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/darkness.js
 */
'use strict';

module.exports = {
  id: 'darkness',
  name: 'Darkness',
  level: 2,
  school: 'evocation',
  descriptors: ['darkness'],
  castingTime: 'standard',
  components: ['V', 'M/DF'],
  materialComponents: [{ id: 'bat_fur', quantity: 1, consumed: true }],
  range: 'touch',
  target: 'object touched',
  area: '20-ft. radius',
  duration: '10 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say(`Inky shadows billow out from ${target.name}, swallowing all light.`);
    // Logic: Provides 20% concealment to those within.
  }
};
