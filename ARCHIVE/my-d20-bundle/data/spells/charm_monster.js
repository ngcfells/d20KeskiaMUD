/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/charm_monster.js
 * PURPOSE: SRD - Higher tier charm for any creature type.
 */

'use strict';

module.exports = {
  id: 'charm_monster',
  name: 'Charm Monster',
  level: 4,
  school: 'enchantment',
  subschool: 'charm',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'one living creature',
  duration: '1 day/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('charmed', { master: caster.id });
      caster.say(`You weave a web of friendship around ${target.name}'s mind.`);
    }
  }
};
