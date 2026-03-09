/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_snares_and_pits.js
 */
'use strict';

module.exports = {
  id: 'detect_snares_and_pits',
  name: 'Detect Snares and Pits',
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
    caster.say("You become aware of magically hidden or mechanically complex traps in the path ahead.");
  }
};
