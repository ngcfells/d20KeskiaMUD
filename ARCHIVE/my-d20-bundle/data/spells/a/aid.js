/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Aid
 * Source: WotC | Player's Handbook p.196
 * 
 * Bolsters the target with divine resolve, granting temporary 
 * vitality and a morale boost to accuracy and fear resistance.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'aid',
  name: 'Aid',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'], 
  source: 'WotC | Player\'s Handbook p.196',

  /**
   * SPELL LISTS:
   * - Cleric: 2
   * - Paladin: 2
   * - Good Domain: 2
   * - Luck Domain: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: '1 min./level', 
  savingThrow: 'none (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const bonusCL = Math.min(cl, 10);
    const tempHPAmount = (Math.floor(Math.random() * 8) + 1) + bonusCL;

    const aidEffect = state.EffectFactory.create('aid_buff', {
      duration: cl * 60000,
      state: { 
        tempHP: tempHPAmount,
        cl: cl
      }
    });

    if (target.addEffect(aidEffect)) {
      // Perspective: Caster
      caster.say(`<yellow>You lay your hands upon ${target.name}. A warm, golden light flows from your palms, weaving a shroud of divine resolve around them.</yellow>`);
      
      // Perspective: Target
      target.say("<bold><cyan>A surge of holy energy bolsters your spirit! You feel faster, stronger, and far less afraid of the dark.</bold></cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<yellow>${caster.name} touches ${target.name}, who begins to glow with a faint, steady golden aura.</yellow>`, target);
    }
  }
};
