/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/cause_fear.js
 * PURPOSE: SRD - Forcing a creature to flee.
 */

'use strict';

module.exports = {
  id: 'cause_fear',
  name: 'Cause Fear',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['fear', 'mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'one living creature (5 HD or less)',
  duration: '1d4 rounds',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('frightened');
      caster.say(`${target.name} is overwhelmed by a sudden, chilling dread.`);
    } else {
      target.addEffect('shaken', { duration: '1 round' });
    }
  }
};
