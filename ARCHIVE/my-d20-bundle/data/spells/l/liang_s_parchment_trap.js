/**
 * Canonical Spell Definition
 * ---------------------------
 * A defensive ward that transforms a physical scroll into a swarm of 
 * animated parchment. These pages surround targets in the area, 
 * restricting movement and dealing slashing damage through magical friction.
 */
const D20Utils = require('../../../lib/d20/d20Utils');

module.exports = {
  id: 'liang_s_parchment_trap',
  name: "Liang's Living Parchment Trap",
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['force', 'binding'],
  source: 'Homebrew | Archival Defense Series',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { 
      id: 'blank_scroll_fine', 
      quantity: 1, 
      minValue: 50, 
      consumed: true, 
      notes: 'A blank scroll of high-quality vellum.' 
    }
  ],

  range: 'close',
  target: 'area',
  area: '10-ft. square emanation',
  duration: '1 round/level',
  savingThrow: 'reflex-partial',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 6000;
    const dc = 10 + 5 + D20Utils.getModifier(caster.getAttribute('intelligence') || 10);

    caster.say("<magenta>You activate the scroll, and the air fills with a whirlwind of fluttering pages that bind your opponents.</magenta>");

    const areaEffect = state.EffectFactory.create('parchment_entangle_area', {
      config: { 
        name: "Living Parchment Trap",
        duration: durationMs 
      },
      state: {
          casterId: caster.id,
          dc: dc
      }
    });

    caster.room.addEffect(areaEffect);
  },

  emotes: {
    entrap: (victim) => {
      victim.say("<yellow>Magical parchment wraps around your limbs, making it difficult to move!</yellow>");
      victim.room.broadcastExcept(victim, `${victim.name} is hindered by a swarm of animated parchment.`);
    }
  }
};
