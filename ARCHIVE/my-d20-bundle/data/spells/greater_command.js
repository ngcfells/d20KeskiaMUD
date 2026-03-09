/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/greater_command.js
 */
'use strict';

module.exports = {
  id: 'greater_command',
  name: 'Greater Command',
  level: 5,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['language-dependent', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V'],
  range: 'close',
  target: 'one creature/level',
  duration: '1 round/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('commanded_action_prolonged');
    }
  }
};
