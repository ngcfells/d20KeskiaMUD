/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_animals_or_plants.js
 */
'use strict';

module.exports = {
  id: 'detect_animals_or_plants',
  name: 'Detect Animals or Plants',
  level: 1,
  school: 'divination',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'medium',
  target: 'area',
  duration: 'concentration',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("You focus your senses on the natural life nearby.");
    // Logic: Detects living animals/plants in the area, increasing awareness over time.
  }
};
