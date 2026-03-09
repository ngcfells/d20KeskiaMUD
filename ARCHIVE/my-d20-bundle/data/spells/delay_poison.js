/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/delay_poison.js
 */
'use strict';

module.exports = {
  id: 'delay_poison',
  name: 'Delay Poison',
  level: 2,
  school: 'conjuration',
  subschool: 'healing',
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  range: 'touch',
  target: 'creature touched',
  duration: '1 hour/level',
  savingThrow: 'will (harmless)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    target.addEffect('poison_delayed');
    caster.say(`${target.name}'s body fights off the immediate effects of a poison.`);
  }
};
