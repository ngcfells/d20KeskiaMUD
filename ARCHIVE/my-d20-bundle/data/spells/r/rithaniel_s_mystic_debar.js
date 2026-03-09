/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Rithaniel's Mystic Debar
 * Source: Dungeons Wiki | Rithaniel (2009)
 * 
 * An advanced abjuration that creates a localized 'dual-reality'. 
 * Magic is not dispelled, but tethered to its point of origin. 
 * Crossing the boundary of the debar suppresses any magic that 
 * does not share the target's origin-state.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'rithaniel_s_mystic_debar',
  name: "Rithaniel's Mystic Debar",
  level: 7, // Wizard 7 / Cleric 9
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Dungeons Wiki | Rithaniel | 2009',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 7
   * - Cleric: 9
   * - Protection Domain: 8
   * - Void Domain: 7
   */
  castingTime: '1 standard action',
  components: ['V', 'S', 'M', 'DF'],
  materialComponents: [
    {
      id: 'magnetized_shavings',
      quantity: 1,
      consumed: true,
      notes: 'A pinch of magnetized metal shavings.'
    }
  ],

  range: 'personal',
  target: 'self (10-ft. radius emanation)',
  area: '10-ft. radius emanation',
  duration: '10 min./level (D)',
  savingThrow: 'none',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 600000; // 10 mins per level

    // Capture everyone/everything inside the radius at the moment of casting
    const insideAtCasting = caster.room.characters.map(c => c.id);
    const itemsAtCasting = caster.room.items.map(i => i.id);

    const debarEffect = state.EffectFactory.create('mystic_debar_effect', {
      duration: duration,
      state: { 
        casterId: caster.id,
        originRoomId: caster.room.id,
        nativeEntities: insideAtCasting,
        nativeItems: itemsAtCasting
      }
    });

    if (caster.addEffect(debarEffect)) {
      caster.say("<cyan>You release the magnetized shavings; they hover in a perfect sphere before vanishing, leaving the air tasting of ozone and absolute stillness.</cyan>");
      caster.room.broadcastExcept(caster, `<cyan>The air around ${caster.name} shimmers with a translucent, soapy sheen before snapping into an invisible barrier.</cyan>`);
    }
  }
};
