'use strict';

module.exports = {
  id: 'detect_magic',
  name: 'Detect Magic',
  level: 0,
  school: 'divination',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: '60 ft',
  area: 'cone',
  duration: 'concentration',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    caster.say(`<yellow>You sense magical auras in the area...</yellow>`);

    // Example: list magical items in the room
    const room = caster.room;
    const magicalItems = room.items.filter(i => i.getMeta('isMagical'));

    if (magicalItems.length === 0) {
      caster.say("You detect no magical auras.");
      return;
    }

    caster.say("You detect the following magical auras:");
    magicalItems.forEach(item => caster.say(` - ${item.name}`));
  },

  onEnd(state, caster) {
    caster.say(`<cyan>Your magical senses fade.</cyan>`);
  }
};
