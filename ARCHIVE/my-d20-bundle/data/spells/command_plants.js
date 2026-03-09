/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/spells/command_plants.js
 */
'use strict';

module.exports = {
  id: 'command_plants',
  name: 'Command Plants',
  level: 4,
  school: 'transmutation',
  descriptors: [],
  castingTime: 'standard',
  components: ['V'],
  range: 'close',
  target: 'one or more plant creatures',
  duration: '1 day/level',
  savingThrow: 'will',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    if (!ctx.savePassed && target.type === 'plant') {
      target.addEffect('charmed');
      caster.say(`The plant-life bends to your will.`);
    }
  }
};
