/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/calm_emotions.js
 * PURPOSE: SRD - Suppressing rage, fear, and confusion.
 */

'use strict';

module.exports = {
  id: 'calm_emotions',
  name: 'Calm Emotions',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'medium',
  target: 'creature',
  area: '20-ft.-radius spread',
  duration: 'concentration',
  savingThrow: 'will',
  spellResistance: true,
  requiresConcentration: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.removeEffect('rage');
      target.removeEffect('fear');
      target.addEffect('emotionally_neutral');
      caster.say(`A wave of absolute serenity washes over ${target.name}.`);
    }
  }
};ca
