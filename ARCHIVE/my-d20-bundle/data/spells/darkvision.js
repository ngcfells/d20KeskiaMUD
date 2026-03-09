/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/darkvision.js
 */
'use strict';

module.exports = {
  id: 'darkvision',
  name: 'Darkvision',
  level: 2,
  school: 'transmutation',
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [{ id: 'dried_carrot', quantity: 1, consumed: true }],
  range: 'touch',
  target: 'creature touched',
  duration: '1 hour/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    target.addEffect('darkvision', { range: 60 });
    caster.say(`${target.name}'s eyes take on a faint red glow, piercing the gloom.`);
  }
};
