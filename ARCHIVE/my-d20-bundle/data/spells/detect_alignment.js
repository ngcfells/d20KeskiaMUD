/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_alignment.js
 */
'use strict';

module.exports = {
  id: 'detect_alignment',
  name: 'Detect Alignment',
  level: 1,
  school: 'divination',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: '60 ft.',
  target: 'cone-shaped emanation',
  duration: 'concentration',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("Your awareness expands, revealing the moral/ethical aura of nearby beings.");
    // Logic: Standard D&D detection mechanics (faint presence -> strong aura).
  }
};
