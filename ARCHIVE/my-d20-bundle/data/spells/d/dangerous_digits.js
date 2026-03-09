/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Dangerous Digits
 * Source: Adamant Entertainment | Dread Codex p.99
 * 
 * Enchants the skeletal hands of your animated servants, allowing them 
 * to detach and launch their phalanges as high-velocity missiles. 
 * Each shot is punctuated by a brilliant blue arcane flash.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'dangerous_digits',
  name: 'Dangerous Digits',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.99',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Death Domain: 3
   */
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [], // No material components for this spell

  range: 'close', // 25 ft. + 5 ft./2 levels
  target: '1 animated skeleton per caster level',
  area: null,
  duration: 'permanent', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    
    // Find skeletons in the room belonging to the caster
    const validSkeletons = caster.room.npcs.filter(npc => 
      npc.hasTag('skeleton') && 
      npc.getMeta('master') === caster.id
    ).slice(0, cl);

    if (validSkeletons.length === 0) {
      return caster.say("You have no skeletal servants nearby to empower.");
    }

    validSkeletons.forEach(skeleton => {
      const digitEffect = state.EffectFactory.create('dangerous_digits_effect', {
        state: { 
          remainingFingers: 10,
          size: skeleton.getMeta('size') || 'M'
        }
      });

      if (skeleton.addEffect(digitEffect)) {
        skeleton.say("<blue>Your phalanges hum with a sharp, azure resonance.</blue>");
      }
    });

    caster.say(`<blue>You weave a crackling blue aura into the hands of ${validSkeletons.length} skeletons.</blue>`);
    caster.room.broadcastExcept(caster, `<blue>${caster.name} gestures, and the skeletal hands of their servants begin to pulse with a cold blue light.</blue>`);
  }
};
