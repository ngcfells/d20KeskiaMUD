'use strict';

module.exports = {
  id: 'mage_armor',
  name: 'Mage Armor',
  level: 1,
  school: 'conjuration',
  descriptors: ['force'],

  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  range: 'touch',
  target: 'creature',
  duration: '1 hour',
  savingThrow: 'none',
  spellResistance: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const bonus = 4;

    target.setMeta('mage_armor_bonus', bonus);
    target.setMeta('mage_armor_active', true);

    caster.say(`<yellow>${target.name} is surrounded by a shimmering field of force.</yellow>`);
    target.say(`<cyan>You feel protected by magical armor.</cyan>`);
  },

  onEnd(state, caster, target) {
    target.setMeta('mage_armor_bonus', 0);
    target.setMeta('mage_armor_active', false);

    target.say(`<red>The magical armor surrounding you fades away.</red>`);
  }
};
