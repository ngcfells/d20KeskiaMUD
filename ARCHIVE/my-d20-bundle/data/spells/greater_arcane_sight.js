/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/greater_arcane_sight.js
 * PURPOSE: Advanced divination for the d20 spellcasting engine.
 */

'use strict';

module.exports = {
  id: 'greater_arcane_sight',
  name: 'Greater Arcane Sight',
  level: 7,
  school: 'divination',
  subschool: null,
  descriptors: [],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'personal',
  target: 'self',
  area: '120-ft. line of sight',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say("Your vision pierces the veil, instantly identifying all magical auras.");
    target.addEffect('greater_arcane_sight');
    // Logic: Automatically know the school and strength of all auras in range.
  }
};
