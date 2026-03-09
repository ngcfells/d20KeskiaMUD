/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/charm_person.js
 */
'use strict';

module.exports = {
  id: 'charm_person',
  name: 'Charm Person',
  level: 1,
  school: 'enchantment',
  subschool: 'charm',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'one humanoid creature',
  duration: '1 hour/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('charmed', { master: caster.id });
      caster.say(`${target.name} views you as a trusted friend and ally.`);
    }
  }
};
