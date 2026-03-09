/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/call_lightning.js
 * PURPOSE: SRD - Calling down vertical bolts from a storm cloud.
 */

'use strict';

module.exports = {
  id: 'call_lightning',
  name: 'Call Lightning',
  level: 3,
  school: 'evocation',
  subschool: null,
  descriptors: ['electricity'],
  castingTime: '1 round',
  components: ['V', 'S'],
  range: 'medium',
  target: 'creature',
  area: null,
  duration: '1 min./level',
  savingThrow: 'ref',
  spellResistance: true,
  requiresConcentration: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // Initial bolt: 3d6 (or 3d10 in a storm)
    const damage = state.Dice.roll('3d6');
    target.damage(damage, caster, 'electricity');
    caster.say("You call a jagged bolt of lightning from the heavens!");
  }
};
