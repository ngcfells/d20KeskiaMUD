/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/delayed_blast_fireball.js
 */
'use strict';

module.exports = {
  id: 'delayed_blast_fireball',
  name: 'Delayed Blast Fireball',
  level: 7,
  school: 'evocation',
  descriptors: ['fire'],
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'sulfur', quantity: 1, consumed: true },
    { id: 'bat_guano', quantity: 1, consumed: true }
  ],
  range: 'long',
  target: 'area',
  area: '20-ft. radius spread',
  duration: 'special', // up to 5 rounds or instantaneous
  savingThrow: 'ref',
  spellResistance: true,
  requiresConcentration: false, // Only while holding the energy
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("You hurl a shimmering bead of fire that delays its detonation.");
    // Logic: Detonates on command, concentration loss, or 5 rounds. Damage: 1d6/level.
  }
};
