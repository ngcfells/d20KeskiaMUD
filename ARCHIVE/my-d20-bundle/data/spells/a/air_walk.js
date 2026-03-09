/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Air Walk
 * Source: WotC | Player's Handbook p.196
 * 
 * Enables the subject to tread on air as if it were solid ground. 
 * The subject can move upward or downward at a 45-degree angle 
 * at half speed. Very strong winds can push the subject, but 
 * they are otherwise as stable as if on land.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'air_walk',
  name: 'Air Walk',
  level: 4,
  school: 'transmutation',
  subschool: null,
  descriptors: ['air'], 
  source: 'WotC | Player\'s Handbook p.196',

  /**
   * SPELL LISTS:
   * - Cleric: 4
   * - Druid: 4
   * - Air Domain: 4
   */

  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  range: 'touch',
  target: 'one creature touched',
  area: null,
  duration: '10 min./level', 
  savingThrow: 'none (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 600000; // 10 minutes per level

    const walkEffect = state.EffectFactory.create('air_walk_active', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (target.addEffect(walkEffect)) {
      // Perspective: Target
      target.say("<bold><cyan>The air beneath your feet suddenly feels as firm and supportive as solid stone!</bold></cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>${target.name} steps upward, treading upon the invisible currents of the air as if climbing a staircase.</cyan>`, target);
    }
  }
};
