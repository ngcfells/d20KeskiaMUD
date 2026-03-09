/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/demand.js
 */
'use strict';

module.exports = {
  id: 'demand',
  name: 'Demand',
  level: 8,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['language-dependent', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'unlimited',
  target: 'creature',
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      caster.say(`Your mental command travels instantly across the planes to ${target.name}'s mind.`);
      // Logic: Command target to perform a simple task that lasts 1 day/level.
    }
  }
};
