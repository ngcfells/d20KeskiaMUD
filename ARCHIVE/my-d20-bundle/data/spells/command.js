/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/command.js
 */
'use strict';

module.exports = {
  id: 'command',
  name: 'Command',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['language-dependent', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V'],
  range: 'close',
  target: 'one living creature',
  duration: '1 round',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      caster.say(`You speak a single word of power: "${ctx.args || 'Halt'}"`);
      target.addEffect('commanded_action');
    }
  }
};
