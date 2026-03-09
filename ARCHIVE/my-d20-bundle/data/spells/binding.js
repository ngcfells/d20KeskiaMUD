/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/binding.js
 * PURPOSE: SRD - Powerful containment of extraplanar or powerful beings.
 */

'use strict';

module.exports = {
  id: 'binding',
  name: 'Binding',
  level: 8,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'opals', quantity: 1, minValue: 500, consumed: true },
    { id: 'vellum_scroll', quantity: 1, consumed: true }
  ],
  range: 'close',
  target: 'creature',
  duration: 'permanent',
  savingThrow: 'will',
  spellResistance: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed) {
      target.addEffect('bound_immobile');
      caster.say(`You weave chains of pure law around ${target.name}, anchoring them to this spot forever.`);
    }
  }
};
