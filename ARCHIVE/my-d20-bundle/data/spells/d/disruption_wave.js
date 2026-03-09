/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A powerful surge of positive energy that unravels the negative 
 * forces sustaining undead. It is an absolute death sentence for 
 * the weak-willed dead and a devastating blow to the strong.
 */
const DamageTypes = require('../../lib/combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'disruption_wave',
  name: 'Disruption Wave',
  level: 7,
  school: 'evocation',
  subschool: null,
  descriptors: ['positive-energy'],
  source: 'Dread Codex | p. 15',

  /**
   * SPELL LISTS:
   * - Cleric: 7
   * - Sorcerer/Wizard: 7
   * - Sun Domain: 7
   * - Glory Domain: 7
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M/DF'],
  
  materialComponents: [
    { 
      id: 'glass_marble', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small glass marble.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', // 25 ft + 5 ft/2 levels
  target: 'area',
  area: 'cone-shaped emanation',
  duration: 'instantaneous',
  savingThrow: 'fort-partial', // Unique: Affects undead despite their immunity
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, targets, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const targetList = Array.isArray(targets) ? targets : [targets];

    // CASTING EMOTES
    caster.say("<white>You crush the glass marble between your fingers, chanting a final, resonant word of life. A titanic wave of brilliant white light erupts from your palms!</white>");
    caster.room.broadcastExcept(caster, `<white>${caster.name} shatters a glass sphere in their grip, releasing a blinding, fan-shaped wave of pure radiance that roars through the room.</white>`);

    targetList.forEach(target => {
      const isUndead = target.getMeta('isUndead') || false;

      // Logic: Harms ONLY undead creatures.
      if (!isUndead) {
        target.say("<cyan>The wave of white light washes over you like a summer breeze, leaving you feeling strangely refreshed but unharmed.</cyan>");
        return;
      }

      // 3.5e Rule: This spell specifically bypasses Undead immunity to Fortitude saves.
      const dc = 10 + 7 + Math.floor(((caster.getAttribute('intelligence') || caster.getAttribute('wisdom') || 10) - 10) / 2);
      const roll = Math.floor(Math.random() * 20) + 1;
      const fortSave = (target.getAttribute('fortitude') || 0) + roll;

      if (fortSave < dc) {
        // FAIL: DESTROYED
        this.emotes.destroyed(target, caster);
        if (typeof target.die === 'function') {
            target.die(caster);
        }
      } else {
        // SUCCESS: 1d8/level (max 15d8)
        const diceCount = Math.min(casterLevel, 15);
        let damage = 0;
        for (let i = 0; i < diceCount; i++) {
          damage += Math.floor(Math.random() * 8) + 1;
        }

        this.emotes.damaged(target, caster);
        if (typeof target.takeDamage === 'function') {
          target.takeDamage(damage, DamageTypes.ENERGY, caster);
        }
      }
    });
  },

  emotes: {
    destroyed: (target, caster) => {
      target.say("<red>The positive energy is too much! Your necrotic bindings shatter instantly, and your form dissolves into fine grey ash.</red>");
      target.room.broadcastExcept(target, `<white>The wave of light hits ${target.name} with the force of a falling star, vaporizing the creature instantly.</white>`);
    },
    damaged: (target, caster) => {
      target.say("<red>The searing radiance tears through your essence, disrupting the dark currents that keep you animate!</red>");
      target.room.broadcastExcept(target, `<white>${target.name} screeches as the light peels away layers of shadow and rotted flesh, but the creature remains standing.</white>`);
    }
  }
};
