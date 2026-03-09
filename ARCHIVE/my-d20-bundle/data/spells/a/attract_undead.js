/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Attract Undead
 * Source: Adamant Entertainment | Dread Codex p.96
 * 
 * Compels an undead creature to move toward the caster. While not 
 * a charm, it forces the creature to close the distance unless 
 * doing so would cause it obvious harm.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'attract_undead',
  name: 'Attract Undead',
  level: 1,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.96',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Death Domain: 1
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'u_shaped_bone',
      quantity: 1,
      consumed: true,
      notes: 'A small, U-shaped bone, often from a finger or small animal.'
    }
  ],

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one undead creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!target.hasTag('undead')) {
      return caster.say("Your magic finds no cold marrow to pull.");
    }

    if (ctx.savePassed) {
      caster.say(`<yellow>${target.name} resists the necrotic pull of your bone-charm.</yellow>`);
      return;
    }

    const cl = caster.getMeta('level') || 1;
    const attractEffect = state.EffectFactory.create('attract_undead_effect', {
      duration: cl * 6000,
      state: { casterId: caster.id }
    });

    if (target.addEffect(attractEffect)) {
      caster.say(`<cyan>You hold the U-shaped bone aloft. ${target.name} turns its empty gaze toward you, drawn by an irresistible tether.</cyan>`);
      target.room.broadcastExcept(caster, `<cyan>${caster.name} brandishes a curved bone, and ${target.name} begins to shuffle toward them with singular purpose.</cyan>`, target);
    }
  }
};
