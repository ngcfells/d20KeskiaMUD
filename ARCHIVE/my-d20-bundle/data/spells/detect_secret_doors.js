/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_secret_doors.js
 */
'use strict';

module.exports = {
  id: 'detect_secret_doors',
  name: 'Detect Secret Doors',
  level: 2,
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
    caster.say("You search the area for hidden compartments and portals.");
  }
};
