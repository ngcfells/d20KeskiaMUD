/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_undead.js
 */
'use strict';

module.exports = {
  id: 'detect_undead',
  name: 'Detect Undead',
  level: 1,
  school: 'divination',
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  materialComponents: [{ id: 'pinch_of_earth', quantity: 1, consumed: true, notes: 'Earth from a grave.' }],
  range: '60 ft.',
  target: 'cone-shaped emanation',
  duration: 'concentration, up to 1 minute/level',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: true,

  onCast(state, caster, target, ctx) {
    caster.say("You sense the cold, necrotic aura of the unliving.");
  }
};
