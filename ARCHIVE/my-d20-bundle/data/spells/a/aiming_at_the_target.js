/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Aiming at the Target
 * Source: WotC | Spell Compendium p.8
 * 
 * A swift abjuration that locks the caster's focus onto a primary 
 * spell they are already maintaining. It provides a massive 
 * resistance to distractions and physical interference.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'aiming_at_the_target',
  name: 'Aiming at the Target',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [], 
  source: 'WotC | Spell Compendium p.8',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Bard: 2
   * - Focus Domain: 2
   */

  castingTime: 'swift',
  components: ['S'],
  materialComponents: [],

  range: 'personal',
  target: 'self',
  area: null,
  duration: 'concentration, up to 1 round/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. VALIDATION: Must be concentrating on another spell effect
    // We look for any effect tagged with 'is_concentration' that isn't this spell
    const primaryEffect = Array.from(caster.effects).find(e => 
      e.config.type === 'concentration' && e.id !== 'aiming_active'
    );
    
    if (!primaryEffect) {
      return caster.say("<yellow>You aren't currently concentrating on a spell to aim!</yellow>");
    }

    const cl = caster.getMeta('level') || 1;
    const targetSpellName = primaryEffect.config.name;

    const aimingEffect = state.EffectFactory.create('aiming_active', {
      duration: cl * 6000,
      state: { 
        targetEffectId: primaryEffect.id,
        targetSpellName: targetSpellName
      }
    });

    if (caster.addEffect(aimingEffect)) {
      // Perspective: Caster
      caster.say(`<bold><white>You make a sharp, steadying gesture toward your ongoing magic. Your focus on ${targetSpellName} becomes absolute!</white></bold>`);
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<white>${caster.name} narrows their eyes, their body becoming unnaturally still as they lock their focus on their magic.</white>`);
    }
  }
};
