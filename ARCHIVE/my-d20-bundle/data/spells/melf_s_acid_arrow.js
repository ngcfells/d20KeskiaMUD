/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/melf_s_acid_arrow.js
 * PURPOSE: Canonical spell definition for the d20 spellcasting engine.
 */

'use strict';

module.exports = {
  id: 'melf_s_acid_arrow',
  name: 'Melf\'s Acid Arrow',
  level: 2,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['acid'],
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'F'],
  materialComponents: [{ id: 'rhubarb_leaf', quantity: 1, consumed: true }],
  range: 'long',
  target: 'creature',
  area: null,
  duration: 'special', // 1 round + 1 round/3 levels
  savingThrow: 'none',
  spellResistance: false,
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 3.5e requires a ranged touch attack (handled by engine)
    // Initial damage: 2d4
    target.damage(state.Dice.roll('2d4'), caster, 'acid');
    caster.say("A shimmering green arrow streaks from your hand!");
  },

  onEnd(state, caster, target) {
    // Recurring damage is handled by the spell engine's tick logic
  }
};
