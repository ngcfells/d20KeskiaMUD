/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/detect_thoughts.js
 */
'use strict';

module.exports = {
  id: 'detect_thoughts',
  name: 'Detect Thoughts',
  level: 2,
  school: 'divination',
  subschool: null,
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'F/DF'],
  range: '60 ft.',
  target: 'cone-shaped emanation',
  duration: 'concentration, up to 1 min./level',
  savingThrow: 'will',
  spellResistance: false,
  requiresConcentration: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("You tune your mind to the surface thoughts of those around you.");
    // Logic: Round 1: Presence; Round 2: Number/Int scores; Round 3: Surface thoughts.
  }
};
