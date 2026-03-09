/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Derived from Liang Chou's early martial training. The caster 
 * uses their sword (or a free hand) to trace a circular 'Taiji' 
 * motion, redirecting the momentum of incoming attacks.
 */
const Defense = require('../../../lib/combat/defense');

module.exports = {
  id: 'liang_s_fluid_deflection',
  name: "Liang's Fluid Deflection",
  level: 3,
  school: 'abjuration',
  subschool: null,
  descriptors: ['force'],
  source: 'Homebrew | Chris Fells 2026 (Liang Chou Signature)',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Protection Domain: 3
   * - Rarity: Artifact (Unique to Liang Chou or his chosen disciples)
   */

  castingTime: 'immediate', // Can be cast out of turn
  components: ['S', 'F'],
  focus: {
    id: 'jian_sword',
    notes: 'A masterwork Tai ji jian or similar straight sword.'
  },

  range: 'personal',
  target: 'self',
  duration: '1 round',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // EMOTES: SUCCESSFUL CASTING
    caster.say("<cyan>You step into a low stance, your blade tracing a perfect, shimmering circle of force that hums with the rhythm of the Shou peaks.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} shifts their weight with liquid grace, their blade carving a glowing azure arc that seems to distort the very trajectory of nearby air.</cyan>`);

    const effect = state.EffectFactory.create('liangs_deflection_active', {
      config: { duration: 6000 } // 1 round
    });

    caster.addEffect(effect);
  },

  emotes: {
    redirect: (caster, attacker) => {
      caster.say(`<blue>You catch the momentum of ${attacker.name}'s strike, guiding it harmlessly into the earth with a flick of your wrist.</blue>`);
      attacker.say(`<white>Your blow connects with ${caster.name}, but feels as though it hits a spinning silk wheel. Your strength is turned against you, and you stumble.</white>`);
    }
  }
};
