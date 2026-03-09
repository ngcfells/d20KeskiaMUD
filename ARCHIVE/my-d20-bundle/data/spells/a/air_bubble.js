/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Air Bubble
 * Source: WotC | Spell Compendium p.8
 * 
 * Encases the target's head in a shimmering globe of fresh air. 
 * This provides immunity to drowning and inhaled toxins, and 
 * crucially allows verbal spellcasting while submerged.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'air_bubble',
  name: 'Air Bubble',
  level: 1,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['air'], 
  source: 'WotC | Spell Compendium p.8',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Cleric: 1
   * - Druid: 1
   * - Ranger: 1
   */

  castingTime: 'standard',
  components: ['S', 'M'], // No Verbal component—can be cast underwater!
  materialComponents: [
    { 
      id: 'small_bladder', 
      quantity: 1, 
      consumed: false, 
      notes: 'A small bladder filled with air.' 
    }
  ],

  range: 'touch',
  target: 'one creature',
  area: null,
  duration: '1 min./level', 
  savingThrow: 'will negates (harmless)',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000;

    const bubbleEffect = state.EffectFactory.create('air_bubble_effect', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (target.addEffect(bubbleEffect)) {
      // Perspective: Target
      target.say("<bold><cyan>A shimmering, grapefruit-sized sphere of clear air forms around your head!</bold></cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>A globe of fresh air suddenly encases ${target.name}'s head, shimmering slightly in the light.</cyan>`, target);
    }
  }
};
