/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/charm_animal.js
 * PURPOSE: SRD - Making a beast your friend.
 */

'use strict';

module.exports = {
  id: 'charm_animal',
  name: 'Charm Animal',
  level: 1,
  school: 'enchantment',
  subschool: 'charm',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'one animal',
  duration: '1 hour/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed && target.type === 'animal') {
      target.addEffect('charmed', { master: caster.id });
      caster.say(`${target.name} looks at you with newfound trust.`);
    }
  }
};
