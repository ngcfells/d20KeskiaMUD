/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/animate_rope.js
 * PURPOSE: Canonical spell definition for the d20 spellcasting engine.
 */

'use strict';

module.exports = {
  id: 'animate_rope',
  name: 'Animate Rope',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'medium',
  target: 'object', // Nonmagical rope
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("The rope coils and snake-like, awaiting your orders.");
    // Logic: Apply 'entangle' or 'bind' effects based on caster command
  }
};
