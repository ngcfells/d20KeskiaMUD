/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/calm_animals.js
 * PURPOSE: SRD - Soothing natural beasts.
 */

'use strict';

module.exports = {
  id: 'calm_animals',
  name: 'Calm Animals',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'close',
  target: 'animals within 30 ft.',
  area: null,
  duration: '1 min./level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed && target.type === 'animal') {
      target.addEffect('calmed');
      caster.say(`${target.name} grows docile and harmless.`);
    }
  }
};
