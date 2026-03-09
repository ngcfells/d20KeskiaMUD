/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Darksight
 * Source: Adamant Entertainment | Dread Codex p.101
 * 
 * Provides the target with the ability to see in both mundane and 
 * magical darkness. It is an essential tool for navigating the 
 * lightless domains of powerful necromancers and shadow-weavers.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'darksight',
  name: 'Darksight',
  level: 3,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.101',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Cleric: 3
   * - Bard: 3
   * - Shadow Domain: 2
   */
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'dried_carrot_pinch',
      quantity: 1,
      consumed: true,
      notes: 'A pinch of dried, powdered carrot.'
    },
    {
      id: 'agate_stone',
      quantity: 1,
      consumed: false,
      notes: 'A small, polished agate stone.'
    }
  ],

  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: '1 hour/level',
  savingThrow: 'none (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000; // 1 hour per level

    const sightEffect = state.EffectFactory.create('darksight_effect', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (target.addEffect(sightEffect)) {
      // Perspective: Caster
      caster.say(`<cyan>You touch ${target.name}'s eyes with the agate. Their pupils dilate until they are twin pools of liquid black, reflecting even the faintest shimmer of magic.</cyan>`);
      
      // Perspective: Target
      target.say("<cyan>The world around you suddenly resolves into sharp, grey-scale clarity. Even the deepest shadows and magical glooms feel as transparent as glass.</cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>${caster.name} touches the eyes of ${target.name}. For a moment, the recipient's eyes glow with a dull, inner light before settling into a deep black.</cyan>`, target);
    }
  }
};
